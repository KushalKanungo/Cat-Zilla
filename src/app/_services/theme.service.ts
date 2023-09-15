import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  colors = [
    {
      '--dark-accent': '#001C30',
      '--normal-accent': '#176B87',
      '--medium-accent': '#64CCC5',
      '--light-accent': '#DAFFFB'
    },

    {
      '--dark-accent': '#072227',
      '--normal-accent': '#35858B',
      '--medium-accent': '#4FBDBA',
      '--light-accent': '#AEFEFF'
    },

    {
      '--dark-accent': '#214151',
      '--normal-accent': '#F8DC81',
      '--medium-accent': '#A2D0C1',
      '--light-accent': '#EFF7E1'
    },

    {
      '--dark-accent': '#422a77',
      '--normal-accent': '#a076f9',
      '--medium-accent': '#d7bbf5',
      '--light-accent': '#ede4ff'
    },

    {
      '--dark-accent': '#4C3D3D',
      '--normal-accent': '#C07F00',
      '--medium-accent': '#FFD95A',
      '--light-accent': '#FFF7D4'
    },

    {
      '--dark-accent': '#251b37',
      '--normal-accent': '#372948',
      '--medium-accent': '#ffcaca',
      '--light-accent': '#ffecef'
    },

    {
      '--dark-accent': '#0078AA',
      '--normal-accent': '#3AB4F2',
      '--medium-accent': '#F2DF3A',
      '--light-accent': '#F6F6F6'
    },

    {
      '--dark-accent': '#415D43',
      '--normal-accent': '#709775',
      '--medium-accent': '#8FB996',
      '--light-accent': '#A1CCA5'
    },

    {
      '--dark-accent': '#1E2749',
      '--normal-accent': '#273469',
      '--medium-accent': '#E4D9FF',
      '--light-accent': '#FAFAFF'
    },

    {
      '--dark-accent': '#358600',
      '--normal-accent': '#63C132',
      '--medium-accent': '#9EE37D',
      '--light-accent': '#CFFCFF'
    },
    {
      '--dark-accent': '#FE5D9F',
      '--normal-accent': '#F686BD',
      '--medium-accent': '#F4BBD3',
      '--light-accent': '#F1E4F3'
    },
    {
      '--dark-accent': '#393E41',
      '--normal-accent': '#E7BB41',
      '--medium-accent': '#44BBA4',
      '--light-accent': '#E7E5DF'
    },
    {
      '--dark-accent': '#27005D',
      '--normal-accent': '#9400FF',
      '--medium-accent': '#AED2FF',
      '--light-accent': '#E4F1FF'
    },
    {
      '--dark-accent': '#27374D',
      '--normal-accent': '#526D82',
      '--medium-accent': '#9DB2BF',
      '--light-accent': '#DDE6ED'
    },
    {
      '--dark-accent': '#424874',
      '--normal-accent': '#A6B1E1',
      '--medium-accent': '#DCD6F7',
      '--light-accent': '#F4EEFF'
    },
    {
      '--dark-accent': '#1B262C',
      '--normal-accent': '#0F4C75',
      '--medium-accent': '#3282B8',
      '--light-accent': '#BBE1FA'
    }
  ]

  setTheme (id: number) {
    for (const col in this.colors[id]) {
      document.documentElement.style.setProperty(col, (this.colors[id] as any)[col])
    }
    this.saveThemeInLocalStorage(this.colors[id])
  }

  saveThemeInLocalStorage (theme: any) {
    localStorage.setItem('theme', JSON.stringify(theme))
  }

  setUserDefinedTheme () {
    const userTheme = localStorage.getItem('theme')
    if (userTheme === undefined || userTheme === null) {
      return
    }
    const themeColors = JSON.parse(userTheme)
    for (const col in themeColors) {
      document.documentElement.style.setProperty(col, (themeColors)[col])
    }
  }
}
