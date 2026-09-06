const fs = require('fs')
const path = require('path')

function getCaseSensitivePath(inputPath) {
  const absolute = path.resolve(inputPath)
  const { root } = path.parse(absolute)
  const relative = absolute.slice(root.length)
  if (!relative) {
    return root
  }

  let current = root
  for (const segment of relative.split(path.sep)) {
    if (!segment) continue
    let next = path.join(current, segment)
    try {
      const match = fs.readdirSync(current).find(
        (entry) => entry.toLowerCase() === segment.toLowerCase()
      )
      if (match) {
        next = path.join(current, match)
      }
    } catch {
      // Keep the original segment if this directory cannot be read.
    }
    current = next
  }

  return current
}

const projectRoot = getCaseSensitivePath(__dirname)

if (path.resolve(process.cwd()) !== projectRoot) {
  process.chdir(projectRoot)
}

function canonicalizeToProjectRoot(filePath) {
  if (typeof filePath !== 'string' || filePath.length === 0) {
    return filePath
  }

  const withSep = filePath.replace(/[/\\]/g, path.sep)
  const rootWithSep = projectRoot.replace(/[/\\]/g, path.sep)
  if (withSep.toLowerCase().startsWith(rootWithSep.toLowerCase())) {
    return projectRoot + withSep.slice(rootWithSep.length)
  }

  return filePath
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config) => {
    config.context = projectRoot
    config.resolve.modules = [
      path.join(projectRoot, 'node_modules'),
      ...(config.resolve.modules || ['node_modules']),
    ]
    config.plugins.push({
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('CanonicalizeProjectPath', (factory) => {
          factory.hooks.afterResolve.tap('CanonicalizeProjectPath', (resolveData) => {
            if (!resolveData) return
            resolveData.context = canonicalizeToProjectRoot(resolveData.context)
            const created = resolveData.createData
            if (!created) return
            created.resource = canonicalizeToProjectRoot(created.resource)
            created.context = canonicalizeToProjectRoot(created.context)
            if (created.resourceResolveData?.path) {
              created.resourceResolveData.path = canonicalizeToProjectRoot(
                created.resourceResolveData.path
              )
            }
          })
        })
      },
    })
    return config
  },
}

module.exports = nextConfig
