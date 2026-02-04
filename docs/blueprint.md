# **App Name**: Eternal Echo

## Core Features:

- User Authentication: Implement Firebase Authentication with Google, Email, and Phone Number sign-in options.
- Invite Creation: Allow users to create and personalize Valentine's invitations with a partner's name and custom message. Store invite details in Cloud Firestore.
- Unique URL Generation: Generate a unique URL for each invite, such as /v/[inviteId], linking to the recipient's view.
- Interactive UI Experience: Design a romantic, soft-pastel-themed recipient interface with 'Yes' and 'No' buttons.
- Evasive 'No' Button: Make the 'No' button dynamically move or jump when hovered over, using Framer Motion or CSS, adding a playful UI trick.
- Celebratory Success State: Trigger a full-screen heart confetti animation using canvas-confetti upon clicking 'Yes' and update the invite status in Firestore.
- Real-time Response Notification: Implement a Firestore listener to provide immediate 'They said YES!' notification on the sender's dashboard.

## Style Guidelines:

- Primary color: Soft blush pink (#F4B4C7), evoking a romantic and gentle feeling.
- Background color: Desaturated cream (#F8F6F3), providing a subtle and elegant backdrop.
- Accent color: Pale lavender (#D0B4F4), used to highlight interactive elements and add a touch of playfulness.
- Body and headline font: 'Alegreya', a serif font lending an elegant and intellectual feel to the text.
- Utilize lucide-react for clean and modern icons to enhance the interactive experience.
- Design the UI with a 'bento-box' style using rounded cards and soft gradients to maintain a modern and playful aesthetic.
- Incorporate subtle animations for UI transitions and button interactions to improve user engagement.