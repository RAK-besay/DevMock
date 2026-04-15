This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




export async function updateUserProfile(params: { name?: string; password?: string }) {
try {
const currentUser = await getCurrentUser();

        if (!currentUser) {
            return { success: false, message: "You must be logged in to update your profile." };
        }

        let isUpdated = false;

        // 1. Update the name in Firestore if it was changed
        if (params.name && params.name !== currentUser.name) {
            await db.collection('users').doc(currentUser.id).update({
                name: params.name
            });
            isUpdated = true;
        }

        // 2. Update the password in Firebase Auth if a new one was typed
        if (params.password && params.password.length >= 6) {
            await auth.updateUser(currentUser.id, {
                password: params.password
            });
            isUpdated = true;
        }

        if (isUpdated) {
            // *** THE MAGIC FIX *** // This destroys the cached pages and forces Next.js to pull the fresh Firebase data!
            revalidatePath('/');
            revalidatePath('/profile');

            return { success: true, message: "Profile updated successfully!" };
        } else {
            return { success: true, message: "No changes were made." };
        }

    } catch (error: any) {
        console.error("Error updating profile:", error);
        return {
            success: false,
            message: error.message || "Failed to update profile. Please try again."
        };
    }
}