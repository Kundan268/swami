/**
 * One-time batch rename for Shreeswami PDFs.
 *
 * How to run (about 2 minutes):
 * 1. Open https://script.google.com while signed into the same Google account as Drive
 * 2. New project → paste this whole file
 * 3. Set DRY_RUN to true first, Run → renamePdfs, review Execution log
 * 4. Set DRY_RUN to false, Run → renamePdfs again
 * 5. Approve Drive permission when Google asks
 *
 * Parent folder is Shreeswami; all All Chalisa / All Kawach / … subfolders are included.
 */

const FOLDER_ID = '1EEj9hUZ_nDhKkdt-Vn1SnzEO8XOo7Q4m';
const DRY_RUN = true;

const RENAMES = {
  'Annapurna.pdf': 'Annapurna__अन्नपूर्णा.pdf',
  'Baglamukhi.pdf': 'Baglamukhi__बगलामुखी.pdf',
  'Balaji.pdf': 'Balaji__बालाजी.pdf',
  'BalakRaksha.pdf': 'Balak Raksha__बालक रक्षा.pdf',
  'Batuk Bhairav.pdf': 'Batuk Bhairav__बटुक भैरव.pdf',
  'Bhairav.pdf': 'Bhairav__भैरव.pdf',
  'Bramha.pdf': 'Bramha__ब्रह्मा.pdf',
  'Bruhaspati.pdf': 'Bruhaspati__बृहस्पति.pdf',
  'Chamunda.pdf': 'Chamunda__चामुंडा.pdf',
  'Chaurasi Siddha.pdf': 'Chaurasi Siddha__चौरासी सिद्ध.pdf',
  'Chitragupt.pdf': 'Chitragupt__चित्रगुप्त.pdf',
  'Dhanwantari.pdf': 'Dhanwantari__धन्वंतरी.pdf',
  'Durga.pdf': 'Durga__दुर्गा.pdf',
  'Ganesh.pdf': 'Ganesh__गणेश.pdf',
  'Ganga.pdf': 'Ganga__गंगा.pdf',
  'Gayatri.pdf': 'Gayatri__गायत्री.pdf',
  'Gopal.pdf': 'Gopal__गोपाळ.pdf',
  'Gorakhnath.pdf': 'Gorakhnath__गोरखनाथ.pdf',
  'Hanuman.pdf': 'Hanuman__हनुमान.pdf',
  'JwalaDevi.pdf': 'Jwala Devi__ज्वाला देवी.pdf',
  'Jyotiba.pdf': 'Jyotiba__ज्योतिबा.pdf',
  'Kali.pdf': 'Kali__काली.pdf',
  'Kamakhya.pdf': 'Kamakhya__कामाख्या.pdf',
  'Krishna.pdf': 'Krishna__कृष्ण.pdf',
  'Kshetrapal.pdf': 'Kshetrapal__क्षेत्रपाल.pdf',
  'Kuber1.pdf': 'Kuber1__कुबेर १.pdf',
  'Kuber2.pdf': 'Kuber2__कुबेर २.pdf',
  'Kuber3.pdf': 'Kuber3__कुबेर ३.pdf',
  'Lalita.pdf': 'Lalita__ललिता.pdf',
  'Laxmi.pdf': 'Laxmi__लक्ष्मी.pdf',
  'Mahakali.pdf': 'Mahakali__महाकाली.pdf',
  'Mahalaxmi.pdf': 'Mahalaxmi__महालक्ष्मी.pdf',
  'Mrutyunjay.pdf': 'Mrutyunjay__मृत्युंजय.pdf',
  'Narmada.pdf': 'Narmada__नर्मदा.pdf',
  'Narsinha.pdf': 'Narsinha__नरसिंह.pdf',
  'Navgraha.pdf': 'Navgraha__नवग्रह.pdf',
  'Parshuram.pdf': 'Parshuram__परशुराम.pdf',
  'Parvati.pdf': 'Parvati__पार्वती.pdf',
  'Pitar.pdf': 'Pitar__पितर.pdf',
  'Radha1.pdf': 'Radha1__राधा १.pdf',
  'Radha2.pdf': 'Radha2__राधा २.pdf',
  'Ram.pdf': 'Ram__राम.pdf',
  'Sai.pdf': 'Sai__साई.pdf',
  'Sant.pdf': 'Sant__संत.pdf',
  'SantoshiMaa.pdf': 'Santoshi Maa__संतोषी माता.pdf',
  'Saraswati.pdf': 'Saraswati__सरस्वती.pdf',
  'Shakambhari.pdf': 'Shakambhari__शाकंभरी.pdf',
  'Shani1.pdf': 'Shani1__शनि १.pdf',
  'Shani2.pdf': 'Shani2__शनि २.pdf',
  'Shitala.pdf': 'Shitala__शीतला.pdf',
  'Shiv.pdf': 'Shiv__शिव.pdf',
  'Surya.pdf': 'Surya__सूर्य.pdf',
  'VaishnaoDevi.pdf': 'Vaishno Devi__वैष्णो देवी.pdf',
  'Veerbhadra.pdf': 'Veerbhadra__वीरभद्र.pdf',
  'Vindhyeshwari.pdf': 'Vindhyeshwari__विंध्येश्वरी.pdf',
  'Vishnu.pdf': 'Vishnu__विष्णु.pdf',
  'Vishwakarma1.pdf': 'Vishwakarma1__विश्वकर्मा १.pdf',
  'Vishwakarma2.pdf': 'Vishwakarma2__विश्वकर्मा २.pdf',
};

function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/\.pdf$/i, '') + '.pdf';
}

function buildLookup() {
  const lookup = {};
  Object.keys(RENAMES).forEach(function (oldName) {
    lookup[normalizeName(oldName)] = RENAMES[oldName];
  });
  return lookup;
}

function renamePdfs() {
  const lookup = buildLookup();
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const stats = { renamed: 0, skipped: 0, unmatched: [] };
  renameInFolder(folder, lookup, stats);

  Logger.log(
    (DRY_RUN ? 'DRY RUN. ' : '') +
      'Renamed: ' + stats.renamed +
      ', skipped: ' + stats.skipped +
      ', unmatched: ' + stats.unmatched.length
  );
  if (stats.unmatched.length) {
    Logger.log('Unmatched files:\n' + stats.unmatched.join('\n'));
  }
}

function renameInFolder(folder, lookup, stats) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const current = file.getName();
    const next = lookup[normalizeName(current)];

    if (!next) {
      if (/\.pdf$/i.test(current) && current.indexOf('__') === -1) {
        stats.unmatched.push(folder.getName() + '/' + current);
      }
      continue;
    }

    if (current === next) {
      stats.skipped += 1;
      continue;
    }

    Logger.log((DRY_RUN ? '[dry] ' : '') + current + ' -> ' + next);
    if (!DRY_RUN) {
      file.setName(next);
    }
    stats.renamed += 1;
  }

  const subs = folder.getFolders();
  while (subs.hasNext()) {
    renameInFolder(subs.next(), lookup, stats);
  }
}
