'use client'

import dynamic from 'next/dynamic';

const RolesPage = dynamic(
  () => import('@/features/roles/roles-page'),
  { ssr: false }
)

export default function Page() {
  return <RolesPage />;
}
