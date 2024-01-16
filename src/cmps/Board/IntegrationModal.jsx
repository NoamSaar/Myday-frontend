import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'
import { GoogleBtn } from './GoogleBtn'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateUser } from '../../store/actions/user.actions'
import { GoogleCalendarIcon } from '../../services/svg.service'
import { IntegrationList } from './IntegrationList'

export function IntegrationModal() {
    const session = useSession() //tokens, when session exists we have a user
    const supaBase = useSupabaseClient() //talk to supabase
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [isCalendarChecked, setIsCaledarChecked] = useState(false);
    const { isLoading } = useSessionContext()
    const isDisabled = !loggedInUser || !session

    useEffect(() => {
        if (loggedInUser && loggedInUser.automations) {
            setIsCaledarChecked(loggedInUser.automations.includes('calendar'))
        }
    }, [loggedInUser])

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

    async function handleSwitchChange(isChecked, automation) {
        try {
            let newAtomations = loggedInUser.automations || []
            if (isChecked) {
                newAtomations.push(automation)
            } else {
                newAtomations = newAtomations.filter(currAuto => currAuto !== automation)
            }
            const updatedUser = { ...loggedInUser, automations: newAtomations }
            await updateUser(updatedUser)
            switch (automation) {
                case 'calendar':
                    setIsCaledarChecked(isChecked)
                    break;

                default:
                    break;
            }

        } catch (err) {
            console.log('err', err)
        }
    }

    const integrations = [
        {
            txt: 'Add Calendar event when task is assigned to me',
            icon: <GoogleCalendarIcon />,
            name: 'calendar',
            isChecked: isCalendarChecked
        }
    ]

    if (isLoading) return <div className="integration-modal">Loading...</div>
    return (
        <div className={`${loggedInUser && 'logged-in-user'} ${session && 'session'} integration-modal`}>
            <h1>Integrations</h1>
            {isDisabled && <p>To use our Automations, please sign in with Google & make sure to log in to Myday</p>}
            <GoogleBtn
                onBtnClick={session ? () => signOut() : () => googleSignIn()}
                txt={session ? 'Sign out of google' : 'Sign in with google'} />

            <IntegrationList integrations={integrations} isDisabled={isDisabled} handleSwitchChange={handleSwitchChange} />
        </div>
    )
}
