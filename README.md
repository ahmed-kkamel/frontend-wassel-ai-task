# Secure Chatbot Widget

## Overview

This project is a secure, bilingual chatbot widget. The chatbot supports speech-to-text input, chat history persistence, and follows security practices.

### Key Features

1. **Bilingual Chatbot**

   - Supports both English and Arabic.

2. **Speech-to-Text**

   - Implements speech-to-text functionality using `react-speech-recognition` (not included in the UI but functional under the hood).

3. **Secure Implementation**

   - Implements security best practices, including:
     - `robots.txt` to control search engine indexing.
     - Content Security Policy (CSP) for protection against common attacks.

4. **Chat History Persistence**
   - Chat content is saved using Local Storage, ensuring it persists between page refreshes.

### Tech Stack

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **next-i18next** (for bilingual support)
- **react-speech-recognition** (for speech-to-text functionality)

### Security Measures

#### Content Security Policy (CSP)

This project follows the Next.js security recommendations by implementing a strict CSP policy in `next.config.js`:

```js
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};
```

### Robots.txt

A `robots.txt` file is used to control crawler access.

### Local Development Setup

#### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn

#### Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/chatbot-widget.git
cd chatbot-widget
```

2. **Install Dependencies**

`npm install` or `yarn install`

3. **Start the Development Server**
   `npm run dev` or `yarn dev`
