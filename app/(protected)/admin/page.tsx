"use client";

import { RoleGate } from "@/components/auth/role.gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
//NOTE: if clientComp-> hooks/useCurrentRole; serverComp->lib/auth.ts
import { useCurrentRole } from "@/hooks/use-current-role";

export default async function AdminPage(props: {}) {
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={"ADMIN"}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
      </CardContent>
    </Card>
  );
}
