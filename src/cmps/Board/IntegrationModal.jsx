import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'

export function IntegrationModal() {
    const session = useSession() //tokens, when session exists we have a user
    const supaBase = useSupabaseClient() //talk to supabase
    const { isLoading } = useSessionContext()

    async function googleSignIn() {
        try {
            const { error } = await supaBase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'https://www.googleapis.com/auth/calendar'
                }
            })
            if (error) throw new Error('Error logging in to google provider')

        } catch (err) {
            console.log('err', err)
        }

    }

    async function signOut() {
        try {
            await supaBase.auth.signOut()
        } catch (err) {
            console.log('err', err)
        }
    }

    async function createCalendarEvent() {
        try {
            const event = {
                'summary': 'event name',
                'description': 'Descriptionnnn',
                'start': {
                    'dateTime': new Date().toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                'end': {
                    'dateTime': new Date().toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            };

            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${session.provider_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error(`Failed to create calendar event. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('data', data);
            console.log('event created!');
        } catch (err) {
            console.error('Error creating calendar event:', err);
        }
    }


    if (isLoading) return <div className="integration-modal">Loading...</div>
    // createCalendarEvent()
    return (
        <div className="integration-modal">
            <h1>Integrations</h1>
            {session ?
                <>
                    <h2>Hey {session.user.email}</h2>
                    <button onClick={() => signOut()}>Sign out of google</button>
                </>
                :
                <>
                    <button onClick={() => googleSignIn()}>Sign in with google</button>
                </>
            }
        </div>
    )
}
