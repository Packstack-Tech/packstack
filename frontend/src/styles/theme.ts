export const theme = {
    color: {
        $lightGray: '#F7F9FB',
        $lightGrayBorder: '#E0E8F0',
        $gray: '#EEEEEE',
        $grayBlue: '#4d666e',
        $darkBlue: '#30475F',
        $medBlue: '#006788',
        $blue: '#4183C4',
        $orange: '#F88762',
        $green: '#66D2B2',

        $Gray: '#F0F3F4',
        $GrayBorder: '#EAEFF0',
        $GrayBlue: '#3e606e',
        $Blue: '#62a6bf',
        $LightBlue: '#34ACD4',
        $Green: '#66D2B2',
        $GreenShade: '#52A485',
        $Dark: '#234E5C',
        $LightGray: '#F9FAFB',
        $DarkBlue: '#006080',
        $Orange: '#F58763',
        $Red: '#F54E42',
        $Black: '#232226'
    },

    hexOpacity(hex: string, percent: number) {
        const alpha = Math.round(percent / 100 * 255);
        const AA = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
        return hex + AA;
    },

    layout: {
        $SidebarWidth: 160,
        $MobileWidth: 750
    }
};