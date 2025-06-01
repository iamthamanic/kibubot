import { RACCOOVAUser, KibuOrganization, KibuDepartmentConfig, KibuAreaConfig } from './types'

// Mock User
export const mockUser: RACCOOVAUser = {
  id: '1',
  email: 'demo@raccoova.com',
  raccoovaRole: 'USER',
  tools: ['kibubot', 'scriptony'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

// Mock Organization
export const mockOrganization: KibuOrganization = {
  id: '1',
  name: 'Demo Organisation',
  ownerId: '1',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

// Mock Departments mit Areas
export const mockDepartments: KibuDepartmentConfig[] = [
  {
    id: '1',
    organizationId: '1',
    name: 'Marketing',
    slug: 'marketing',
    icon: 'Megaphone',
    orderIndex: 0,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    areas: [
      {
        id: '1',
        departmentId: '1',
        name: 'Content Kalender',
        slug: 'content-kalender',
        layoutConfig: {},
        widgets: [
          {
            id: 'w1',
            widgetType: 'TEXT',
            position: { x: 0, y: 0, w: 12, h: 2 },
            specificConfig: {
              text: 'Content Planung',
              level: 'h1',
              alignment: 'center'
            }
          },
          {
            id: 'w2',
            widgetType: 'TABLE',
            position: { x: 0, y: 2, w: 12, h: 6 },
            specificConfig: {
              dataSourceModel: 'Kibu_Task',
              visibleColumns: ['title', 'status', 'dueDate'],
              defaultSortField: 'dueDate',
              defaultSortOrder: 'asc'
            }
          }
        ],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        departmentId: '1',
        name: 'Social Media',
        slug: 'social-media',
        layoutConfig: {},
        widgets: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ]
  },
  {
    id: '2',
    organizationId: '1',
    name: 'Vertrieb',
    slug: 'vertrieb',
    icon: 'TrendingUp',
    orderIndex: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    areas: [
      {
        id: '3',
        departmentId: '2',
        name: 'CRM Dashboard',
        slug: 'crm-dashboard',
        layoutConfig: {},
        widgets: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }
    ]
  },
  {
    id: '3',
    organizationId: '1',
    name: 'Projekte',
    slug: 'projekte',
    icon: 'FolderOpen',
    orderIndex: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    areas: []
  }
]