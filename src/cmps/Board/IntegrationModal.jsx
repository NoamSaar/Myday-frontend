import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'
import { GoogleBtn } from './GoogleBtn'

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

    if (isLoading) return <div className="integration-modal">Loading...</div>
    return (
        <div className="integration-modal">
            <h1>Integrations</h1>
            {session && <h2>Hey {session.user.email}</h2>}
            <GoogleBtn onBtnClick={session ? () => signOut() : () => googleSignIn()} txt={session ? 'Sign out of google' : 'Sign in with google'} />
        </div>
    )
}
