import prisma from '@/lib/prisma';
import { GeneralSettingsForm } from "@/components/admin/GeneralSettingsForm";


export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <div className="space-y-6">
      <GeneralSettingsForm settings={settings} />
    </div>
  );
}
