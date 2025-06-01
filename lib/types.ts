// TypeScript-Interfaces basierend auf Prisma-Schema
// Diese werden später durch die generierten Prisma-Typen ersetzt

export interface RACCOOVAUser {
  id: string
  email: string
  raccoovaRole: 'USER' | 'PLATFORM_ADMIN'
  tools: string[]
  createdAt: Date
  updatedAt: Date
}

export interface KibuOrganization {
  id: string
  name: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface KibuDepartmentConfig {
  id: string
  organizationId: string
  name: string
  slug: string
  icon?: string
  orderIndex: number
  createdAt: Date
  updatedAt: Date
  areas?: KibuAreaConfig[]
}

// Layout configuration for area grid system
export interface LayoutConfig {
  columns?: number
  rowHeight?: number
  margin?: [number, number]
  containerPadding?: [number, number]
}

export interface KibuAreaConfig {
  id: string
  departmentId: string
  name: string
  slug: string
  layoutConfig: LayoutConfig
  widgets: WidgetInstanceConfig[]
  createdAt: Date
  updatedAt: Date
}

// Widget-specific configuration types
export type WidgetConfig = 
  | TextWidgetConfig
  | TableWidgetConfig
  | FormWidgetConfig
  | ButtonWidgetConfig
  | AIPromptWidgetConfig
  | N8NTriggerWidgetConfig

export interface TextWidgetConfig {
  content: string
  markdown?: boolean
}

export interface TableWidgetConfig {
  dataSource: string
  columns: Array<{ key: string; label: string; type?: string }>
}

export interface FormWidgetConfig {
  fields: Array<{ name: string; label: string; type: string; required?: boolean }>
  submitAction: string
}

export interface ButtonWidgetConfig {
  label: string
  action: string
  variant?: 'primary' | 'secondary' | 'destructive'
}

export interface AIPromptWidgetConfig {
  prompt: string
  model?: string
  maxTokens?: number
}

export interface N8NTriggerWidgetConfig {
  webhookUrl: string
  method?: 'GET' | 'POST'
}

export interface WidgetInstanceConfig {
  id: string
  widgetType: 'TEXT' | 'TABLE' | 'FORM' | 'BUTTON' | 'AI_PROMPT' | 'N8N_TRIGGER'
  position: {
    x: number
    y: number
    w: number
    h: number
  }
  specificConfig: WidgetConfig
}

export type OrganizationRole = 'ADMIN' | 'MEMBER'