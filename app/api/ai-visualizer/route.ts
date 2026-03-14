import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const style = formData.get('style') as string;
    const imageFile = formData.get('image') as File | null;

    const styleDescriptions: Record<string, string> = {
      modern: 'sleek modern design with clean lines, minimal furniture, neutral palette, and subtle metal accents',
      minimal: 'ultra-minimal design with bare essentials, white walls, natural light, and zen-like tranquility',
      luxury: 'opulent luxury design with marble surfaces, velvet upholstery, gold accents, statement chandelier, and rich jewel tones',
      scandinavian: 'warm Scandinavian hygge design with light wood, cozy textiles, soft whites, plants, and functional simplicity',
    };

    const styleDesc = styleDescriptions[style] || styleDescriptions.modern;

    // If image provided, use vision to analyse then suggest
    let prompt = `You are an expert luxury interior designer. Provide a detailed, professional interior design suggestion for a room redesigned in ${styleDesc} style.

Structure your response as:
1. **Design Concept** (2-3 sentences describing the overall vision)
2. **Colour Palette** (list 4-5 specific colours with hex codes)
3. **Key Furniture Pieces** (5-6 specific recommendations with approximate prices in INR)
4. **Materials & Textures** (flooring, walls, textiles)
5. **Lighting Strategy** (ambient, task, accent lighting suggestions)
6. **Signature Statement Piece** (one hero element that defines the space)
7. **Estimated Budget Range** (total design investment)

Be specific, evocative, and reference real brands and products where possible.`;

    let messages: any[] = [{ role: 'user', content: prompt }];

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      const mediaType = imageFile.type;

      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mediaType};base64,${base64}` },
            },
            {
              type: 'text',
              text: `Analyse this room and then ${prompt}`,
            },
          ],
        },
      ];
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 1000,
    });

    const suggestion = completion.choices[0].message.content;
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('AI Visualizer error:', error);
    return NextResponse.json({ error: 'Failed to generate design suggestion' }, { status: 500 });
  }
}
