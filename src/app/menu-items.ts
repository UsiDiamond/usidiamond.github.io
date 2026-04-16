export interface MenuItem {
  readonly labelKey: string;
  readonly route: string;
  readonly order: number;
  readonly disabled: boolean;
}

export const MENU_ITEMS: readonly MenuItem[] = [
  { labelKey: 'menu.introduction', route: 'home', order: 1, disabled: false },
  { labelKey: 'menu.projects', route: 'projects', order: 2, disabled: false },
  { labelKey: 'menu.education', route: 'education', order: 3, disabled: false },
  { labelKey: 'menu.volunteering', route: 'volunteering', order: 4, disabled: false },
  { labelKey: 'menu.reading', route: 'reading', order: 5, disabled: true },
  { labelKey: 'menu.contact', route: 'contact', order: 6, disabled: false },
];
