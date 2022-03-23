export const DEFAULT_VOLUME_VALUE = 50
export const MAX_VOLUME_VALUE = 100
export const MAX_GAIN_VALUE = 2

export const getGainValueFromVolume = (volume: number) => {
    return MAX_GAIN_VALUE / MAX_VOLUME_VALUE * volume
}