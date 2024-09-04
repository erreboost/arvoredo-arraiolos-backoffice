'use client'
import { useAuths } from '@/app/context/AuthContext'
import { formattingUserGroup } from '@/utils/formattingEditors'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const { setAuthenticated, authenticated } = useAuths()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded: any = jwtDecode(token)
      setUser(decoded)
    }
    if (!authenticated) {
      redirect('/sign-in')
    }
  }, [authenticated])

  return (
    <div className="profile-page flex flex-col items-center justify-center gap-[20px] md:flex-row md:text-[14px]">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <img
          className="h-[100px] w-[100px]"
          src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`}
          alt="Profile Avatar"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[26px] font-semibold md:text-[18px]">{`${user?.firstName} ${user?.lastName}`}</h1>
        <div className="flex items-center gap-[5px] text-[20px]">
          <span className="font-semibold md:text-[14px]">Email:</span>{' '}
          <p className="md:text-[14px]">{user?.email}</p>
        </div>
        <div className="flex items-center gap-[5px] text-[20px]">
          <span className="font-semibold md:text-[14px]">Tipo de Usuário:</span>{' '}
          <p className="md:text-[14px]">
            {formattingUserGroup(user?.userGroup)}
          </p>
        </div>
        <div className="mt-[20px] flex items-center justify-center gap-[5px] text-[20px]">
          <button
            className="h-[40px] w-[100px] rounded-sm bg-red-500 font-semibold text-white md:h-[25px] md:text-[14px]"
            onClick={() => setAuthenticated(false)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
