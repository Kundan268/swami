'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';

export default function ManogatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header language="mr" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex justify-end gap-2 text-sm mb-6">
          <Link
            href="/"
            className="text-orange-700 hover:text-orange-900 hover:underline font-medium"
          >
            Back
          </Link>
          <span className="text-orange-400">|</span>
          <Link
            href="/"
            className="text-orange-700 hover:text-orange-900 hover:underline font-medium"
          >
            Next
          </Link>
        </div>

        {/* Title */}
        <p className="text-center text-orange-800 font-medium mb-1">।। श्री स्वामी समर्थ ।।</p>
        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-900 mb-10">
          मनोगत
        </h1>

        {/* Quote and Image Row */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
          <blockquote className="flex-1 text-lg md:text-xl text-orange-900 leading-relaxed font-medium">
            &ldquo;प्रभो मी न माझा तुमचाची होवो
            <br />
            त्वद इच्छेप्रमाणे ही कृती राहो
            <br />
            असे हे कृपाळा तुम्हाला वाहिलो मी
            <br />
            चरणार्विंदार्पणमस्तु स्वामी&rdquo;
          </blockquote>
          <div className="w-full md:w-64 flex-shrink-0 aspect-[3/4] bg-orange-100 rounded-lg border-2 border-orange-200 flex items-center justify-center text-orange-600 text-sm">
            {/* Placeholder: add author image to /public/data/ and use next/image with src="/data/author.jpg" */}
            छायाचित्र
          </div>
        </div>

        {/* Main content - full text from source document */}
        <div className="prose prose-orange max-w-none text-orange-900 space-y-4 text-base md:text-lg leading-relaxed">
          <p>
            <strong>धर्म-धारयति इति धर्मः</strong>
            <br />
            जो धारण केला जातो, जो धारण करायला शिकवतो तो हिंदू धर्म.
          </p>
          <p>
            &apos;हिनान् गुणान् दुषयती हिंदूनी&apos; याचा अर्थ दोषाचा त्याग तर अपेक्षित आहे व त्याच बरोबर हीन गुणांचा त्यागसुध्दा करतो तो हिंदू.
          </p>
          <p>
            अशा या हिंदू धर्माची अध्यात्मिक क्षेत्रातील वाटचाल ही अफाट आहे. त्यामध्ये अनेक संप्रदाय वेगवेगळ्या मार्गाने अध्यात्माचा विचार करतात. त्यामधीलच एक &apos;श्री दत्तसंप्रदाय&apos; अत्री व अनुसुयानंदन असे &quot;श्रीदत्त&quot; सद्गुरु राज त्यांचा दुसरा अवतार &quot;श्री श्रीपाद श्रीवल्लभ&quot;, तिसरा अवतार &quot;श्री नृसिंहसरस्वती&quot; व चौथा अवतार &quot;श्री स्वामी समर्थ&quot;.
          </p>
          <p>
            याच श्री स्वामी समर्थांनी ३०० हून अधिक योगी या हिंदूस्तानच्या भूमीला दिले. त्यांनी येथे अनेक चमत्कारी लीला करुन दाखवल्या.
          </p>
          <p>
            अशा &apos;श्री स्वामींनी&apos; हिंदू धर्मातील पायाभूत सिध्दांत स्तोत्र रुपाने मला ध्यानावस्थेत दिले त्यांचेच अवतरण या वेबसाईटच्या (Website) रुपाने करण्याचा चिमुकला प्रयत्न येथे केला जात आहे.
          </p>
          <p>
            अक्कलकोट निवासी श्री स्वामी समर्थ यांचा हा प्रसाद www.shreeswami.com या वेबसाईटच्या रुपाने सर्व भाविकांपर्यंत पोहोचवत आहोत.
          </p>
        </div>

        {/* Author */}
        <p className="mt-12 text-right text-orange-800 font-medium">
          — वैद्य गणेश लक्ष्मणराव शिंदे
        </p>
      </div>
    </div>
  );
}
