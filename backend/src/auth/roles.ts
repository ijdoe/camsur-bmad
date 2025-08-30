export enum UserRole {
  Admin = 'Admin',
  Operator = 'Operator',
  Viewer = 'Viewer',
}

export enum Permission {
  ManageUsers = 'manage_users',
  ManageLgus = 'manage_lgus',
  ApproveAlerts = 'approve_alerts',
  ViewAlerts = 'view_alerts',
  GenerateCommunications = 'generate_communications',
  IngestData = 'ingest_data',
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.Admin]: [
    Permission.ManageUsers,
    Permission.ManageLgus,
    Permission.ApproveAlerts,
    Permission.ViewAlerts,
    Permission.GenerateCommunications,
    Permission.IngestData,
  ],
  [UserRole.Operator]: [
    Permission.ApproveAlerts,
    Permission.ViewAlerts,
    Permission.GenerateCommunications,
    Permission.IngestData,
  ],
  [UserRole.Viewer]: [Permission.ViewAlerts],
};
