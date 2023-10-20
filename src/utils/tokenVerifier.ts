const verifyEndpoint =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.SECRET_KEY;

async function verifyToken(token: string): Promise<boolean> {
    if (secret === undefined) {
        throw new Error('Invalid secret key');
    }

    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(
            secret,
        )}&response=${encodeURIComponent(token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    });

    const data = await res.json();

    return data.success;
}

export { verifyToken };
