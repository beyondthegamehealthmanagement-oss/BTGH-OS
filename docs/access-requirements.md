# Access Requirements

The Expo starter runs locally without Supabase or App Store access. The following access will be needed as development progresses.

| Access                                            | Purpose                                                      | Needed when                            |
| ------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| BTGH GitHub repository collaborator access        | Push code and submit pull requests                           | Starter development                    |
| BTGH Supabase project invitation                  | Develop database tables, authentication, and access policies | Before backend integration             |
| Supabase project URL and publishable key          | Connect the app to the BTGH Supabase project                 | Before backend integration             |
| BTGH Expo organization/project access             | Manage shared cloud builds and app configuration             | Before team builds                     |
| BTGH Apple Developer and App Store Connect access | Configure signing and distribute the iOS app                 | Before TestFlight or App Store release |

## Account Ownership

BTGH should own the service accounts and projects. Developers should receive individual invitations with permissions appropriate to their responsibilities.

## Credentials

Share configuration through an approved private channel. Never commit passwords, secret/service-role keys, or signing credentials to GitHub.

The Supabase publishable key is intended for client use. Database access must still be protected by Row Level Security policies.

## Vercel

Vercel is not required for the initial React Native/Expo mobile frontend. Hosting requirements can be revisited if a separate web dashboard or backend service is added.
