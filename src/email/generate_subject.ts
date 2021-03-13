import { WithSubject } from './model';

export async function handler(event: WithSubject): Promise<string> {
    return `ViolArt üzenet: ${event.subject}`;
}
