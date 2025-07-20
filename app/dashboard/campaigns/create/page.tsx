'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY, // Set in .env.local
  dangerouslyAllowBrowser: true,
});

export default function CreateCampaign() {
  const [prompt, setPrompt] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateCampaign = async () => {
    setLoading(true);
    const system = `You're a marketing copywriter. Given a prompt, generate a subject line and email body.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `Prompt: ${prompt}` },
      ],
    });

    const output = response.choices[0].message.content || '';
    const [sub, ...rest] = output.split('\n');
    setSubject(sub.replace('Subject:', '').trim());
    setBody(rest.join('\n').trim());
    setLoading(false);
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('campaigns').insert([
      {
        user_id: user?.id,
        title: prompt.slice(0, 60),
        prompt,
        subject,
        body,
      },
    ]);

    if (!error) {
      router.push('/dashboard'); // or campaigns list
    } else {
      alert('Error saving: ' + error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white pt-24">
      <div className="glass-effect p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Create a Campaign</h1>

        <textarea
          className="w-full p-4 rounded bg-white/10 border border-white/10 mb-4 text-white placeholder-white/60"
          rows={4}
          placeholder="Describe your campaign goal (e.g., Invite to beta test, announce launch)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateCampaign}
          disabled={loading}
          className="btn-primary w-full py-3 rounded mb-6"
        >
          {loading ? 'Generating…' : 'Generate with AI'}
        </button>

        {subject && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Subject Line</label>
              <input
                className="w-full p-3 rounded bg-white/10 border border-white/10 text-white"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Email Body</label>
              <textarea
                className="w-full p-4 rounded bg-white/10 border border-white/10 text-white"
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <button onClick={handleSave} className="btn-primary w-full py-3 rounded">
              Save Campaign
            </button>
          </>
        )}
      </div>
    </main>
  );
}
