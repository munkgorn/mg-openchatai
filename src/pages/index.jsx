import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/server-props'
import { createClient as createClientClient  } from '@/utils/supabase/component'

const Home = ({ user }) => {
    const handleSignOut = async () => {
        const supabase = createClientClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error)
        } else {
            window.location.href = '/login'
        }
    }
    return (
        <div>
            <h1>Welcome, {user?.email}</h1>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    )
}
export default Home

export async function getServerSideProps(context) {
    const supabase = createClient(context)
    const { data, error } = await supabase.auth.getUser()
    console.log('supabase', data)
    if (error || !data) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    return {
      props: {
        user: data.user,
      },
    }
  }