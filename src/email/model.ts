export interface WithSubject {
    subject: string;
}

export interface EmailContent extends WithSubject {
    sender: string;
    body: string;
}

export interface EmailRequest extends WithSubject {
    from: string;
    to: string[];
    cc: string;
    replyTo: string;
    body: string;
}
