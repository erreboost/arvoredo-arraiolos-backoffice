import {NextResponse} from 'next/server';
import {fetchTrees} from './fetchTrees';

export async function GET() {
  try {
    const data = await fetchTrees();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
