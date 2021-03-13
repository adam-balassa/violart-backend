import { EmailContent } from './model';

export async function handler(event: EmailContent): Promise<string> {
    const { sender, subject, body } = event;
    return `
    <h1>Üzenet érkezett a violartstudio.com-ról</h1>
    <div style="background-color: #0001; border-radius: 10px; padding: 8px 16px">
      <b>Feladó</b>: ${sender} </br>
      <b>Tárgy</b>: ${subject} </br>
      <b>Üzenet</b>:
      <p>${body}</p>
    </div>
  `;
}
