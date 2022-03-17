import type {NextPage} from 'next'
import {Header, TabType} from '../components/header';
import {LeftMenu} from "../components/menu";
import {MainContainer} from "../components/main";
import {Player} from "../components/player";
import {useState} from "react";
import styles from "../components/player/index.module.css";

import playerStyles from "../components/player/index.module.css";
const audioBaseUrl = 'https://full-audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/'
const Home: NextPage = () => {
    const categories = {
        New: ["AsmrEarCleaning", "AsmrStickySlime", "AsmrEarBrushing", "AsmrFallingBeads", "AsmrDriedHerbs", "AsmrSlime", "AsmrBubbleWrap", "AsmrEarBlowing", "AsmrEarMassage", "AsmrMicScratching"],
        AllTag: ["Birds", "River", "Rain", "Ocean", "Night", "AsmrVinylCrackle", "Flute", "Winds", "WhiteNoise", "Eternity", "MusicBox", "Lounge", "Shower", "Piano", "Orchestral", "Waterfall", "Thunder", "SpokenBreathing", "AsmrBedSheets", "BrainScanner", "Zen", "Campfire", "Melody", "CanadianForest", "Lakeshore", "WalkingInWoods", "AsmrSlime", "AsmrStickySlime", "Bumblebees", "Chicks", "Chickens", "Cows", "Dolphins", "Ducks", "HorsesTrotting", "MorningBirdsong", "SheepWalking", "TropicalBirds", "AirConditioner", "Dishwasher", "AsmrPageTurning", "CoffeeShop", "Autumn", "UprightPiano", "BrownNoise", "PinkNoise", "AsmrFizzyDrink", "LaserBeam", "ComputerBeeps", "OuterSpace", "RocketEngine", "WalkingInSpaceship", "HeartBeat", "Astral", "Fountain", "Train", "AsmrFoam", "Tribal", "India", "UrbanRain", "Cavern", "Reactor", "WindChimes", "Spaceship", "AsmrMakeupBrush", "Sailing", "Voices", "Watching", "BassMusic", "SpokenSleepAffirmations", "ColdRattle", "AsmrElvishWhispers", "Chirp", "Orbit", "Drum", "ServerRoom", "Storm", "AsmrBoilingWater", "Flute2", "Choir", "Airplane", "Starfield", "SunnyDay", "Guitar", "AsmrWriting", "Dramatic", "Butterfly", "Medieval", "EarthDrama", "Dreams", "AsmrIceCube", "WindSurge", "Forest", "Abstract", "BabyShusher", "GreenNoise", "MilkyWay", "AsmrEarMassage", "AsmrEarBlowing", "Spring", "AsmrFingerFlutter", "Toskana", "City", "Sprinkler", "SlowWaves", "LightRain", "AsmrSkillet", "HeavyRain", "RainyDay", "AsmrBubbleWrap", "Underwater", "TibetanBowlSmall", "TibetanBowlMedium", "TibetanBowlBig", "AsmrPurring", "Immersed", "Afternoon", "Rainstorm", "ForestRain", "Whales", "Seaside", "IcySnow", "AsmrDriedHerbs", "CuckooBird", "Aquarium", "BambooWaterFountain", "BathFilling", "AsmrMicScratching", "BoilingPotion", "DrivingInRain", "FloatingBoat", "HotTub", "RainOnWindow", "WavesOnRocks", "Whales2", "Seagulls", "RainOnRoof", "Duduk", "Playground", "AsmrRainDrops", "Owls", "Humming", "GrandfatherClock", "Frogs", "Dryer", "CatPurring", "BaliMist", "Thunderstorm", "CityAmbience", "IndianDrums", "PachelbelCanon", "Wolf", "FogHorn", "Vacuum", "Loon", "Keyboard", "MonkChant", "AsmrWalkingOnSnow", "OscillatingFan", "Womb", "BabyMarimba", "SpokenHypnoticWords", "BabyBells", "SingingBowlSmall", "SingingBowlMedium", "SingingBowlBig", "Jupiter", "Cicadas", "WindInTrees", "Peepers", "AsmrEarBrushing", "RustlingLeaves", "Crowd", "RainOnTent", "TibetanBowls", "BrahmsLullaby", "SpokenCountingSheep", "Joy", "Rattle", "LappingWater", "AsmrFallingBeads", "DistantTrain", "MagicChimes", "Carnival", "TruckEngine", "SweetDreams", "AsmrEarCleaning", "HairDryer", "SweetHourPrayer", "Ancestral", "FireCrackles", "Highway", "Om", "Harmony", "Binaural2.5hz", "Binaural4hz", "Binaural5hz", "Binaural8hz", "Binaural10hz", "Binaural20hz", "Isochronic2.5hz", "Isochronic4hz", "Isochronic5hz", "Isochronic8hz", "Isochronic10hz", "Isochronic20hz", "Solfeggio174hz", "Solfeggio285hz", "Solfeggio396hz", "Solfeggio417hz", "Solfeggio432hz", "Solfeggio528hz"],
        Spoken: ["SpokenBreathing", "SpokenSleepAffirmations", "SpokenHypnoticWords", "SpokenCountingSheep"],
        Water: ["River", "Ocean", "Rain", "Waterfall", "UrbanRain", "Cavern", "SlowWaves", "HeavyRain", "RainyDay", "Underwater", "Rainstorm", "RainOnRoof", "IcySnow", "Aquarium", "BambooWaterFountain", "BathFilling", "BoilingPotion", "DrivingInRain", "FloatingBoat", "HotTub", "RainOnWindow", "WavesOnRocks", "Immersed", "Seaside", "LappingWater", "Fountain", "Sailing", "LightRain", "ForestRain", "Lakeshore", "RainOnTent", "Shower", "Dishwasher"],
        Nature: ["Winds", "Thunder", "Campfire", "Night", "Storm", "Toskana", "CanadianForest", "WalkingInWoods", "Afternoon", "Thunderstorm", "Jupiter", "WindInTrees", "FireCrackles", "HeartBeat", "SunnyDay", "WindSurge", "Forest", "RustlingLeaves"],
        City: ["UrbanRain", "RainOnRoof", "GrandfatherClock", "CityAmbience", "OscillatingFan", "Vacuum", "Crowd", "Highway", "Train", "DistantTrain", "ColdRattle", "Aquarium", "BathFilling", "DrivingInRain", "HotTub", "Sprinkler", "Playground", "Dryer", "FogHorn", "Keyboard", "Carnival", "TruckEngine", "HairDryer", "Shower", "AirConditioner", "Dishwasher", "CoffeeShop"],
        Melodies: ["Flute", "Lounge", "Piano", "Orchestral", "Zen", "Melody", "WindChimes", "Butterfly", "Medieval", "Humming", "Duduk", "MonkChant", "Eternity", "Astral", "Tribal", "India", "Voices", "Watching", "BassMusic", "Drum", "Flute2", "Choir", "Guitar", "Dramatic", "EarthDrama", "Dreams", "Abstract", "Spring", "City", "BaliMist", "IndianDrums", "PachelbelCanon", "MagicChimes", "SweetHourPrayer", "Ancestral", "Harmony", "Om", "TibetanBowlSmall", "TibetanBowlMedium", "TibetanBowlBig", "SingingBowl", "SingingBowlMedium", "SingingBowlBig", "Joy", "MilkyWay", "Orbit", "Starfield", "Autumn", "UprightPiano"],
        Animal: ["Bumblebees", "Chicks", "Chickens", "Cows", "Dolphins", "Ducks", "HorsesTrotting", "MorningBirdsong", "SheepWalking", "TropicalBirds", "Birds", "Frogs", "CatPurring", "CuckooBird", "Peepers", "Chirp", "Whales2", "Whales", "Seagulls", "Owls", "Wolf", "Loon", "Cicadas"],
        ASMR: ["AsmrVinylCrackle", "AsmrBedSheets", "AsmrPageTurning", "AsmrFizzyDrink", "AsmrFoam", "AsmrMakeupBrush", "AsmrElvishWhispers", "AsmrBoilingWater", "AsmrWriting", "AsmrIceCube", "AsmrFingerFlutter", "AsmrSkillet", "AsmrPurring", "AsmrRainDrops", "AsmrEarCleaning", "AsmrStickySlime", "AsmrEarBrushing", "AsmrFallingBeads", "AsmrDriedHerbs", "AsmrSlime", "AsmrBubbleWrap", "AsmrEarBlowing", "AsmrEarMassage", "AsmrMicScratching", "AsmrWalkingOnSnow"],
        Noise: ["WhiteNoise", "BrownNoise", "PinkNoise", "Spaceship", "Airplane", "GreenNoise", "AirConditioner"],
        Baby: ["Humming", "BrahmsLullaby", "MusicBox", "Womb", "SweetDreams", "BabyBells", "BabyShusher", "BabyMarimba", "Rattle"],
        SciFi: ["BrainScanner", "ComputerBeeps", "OuterSpace", "RocketEngine", "WalkingInSpaceship", "LaserBeam", "Jupiter", "Reactor", "Jupiter", "Spaceship", "ServerRoom"],
        Brainwave: ["Isochronic10hz", "Isochronic20hz", "Isochronic2.5hz", "Isochronic4hz", "Isochronic5hz", "Isochronic8hz", "Binaural10hz", "Binaural20hz", "Binaural2.5hz", "Binaural4hz", "Binaural5hz", "Binaural8hz", "Solfeggio174hz", "Solfeggio285hz", "Solfeggio396hz", "Solfeggio417hz", "Solfeggio432hz", "Solfeggio528hz"]
    } as any

    const [curTab, setCurTab] = useState<TabType>('Library')
    const [curCategory, setCurCategory] = useState<string>('')
    const [playStatus, setPlayStatus] = useState<boolean>(false)
    //inner components
    const Player = () => {
        return <div className={playerStyles.playerContainer}>
            <div className='play-button'>
                {
                    playStatus ? <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                        <circle cx="17" cy="17" r="16.5" stroke="white"/>
                        <rect x="12" y="9" width="3" height="16" fill="white"/>
                        <rect x="19" y="9" width="3" height="16" fill="white"/>
                    </svg> : <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                        <circle cx="17" cy="17" r="16.5" stroke="white"/>
                        <path d="M28.057 17.1144L11.5076 26.5547L11.6068 7.50236L28.057 17.1144Z" fill="white"/>
                    </svg>
                }
            </div>
            <div className={playerStyles.intro}>
                当前:4个项目
            </div>
            <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12L12 1L23 12" stroke="#C4C4C4"/>
            </svg>
        </div>
    }
    return (
        <div className="app-bg" style={{color: '#3d3b3d'}}>
            <Header curTab={curTab} onTabChange={newTab => setCurTab(newTab)}/>
            <LeftMenu categoryNames={Object.keys(categories)} onCategoryClick={(name) => setCurCategory(name)}/>
            <Player/>
            <MainContainer onMusicClick={(name) => {
                const newAudioEle = document.createElement('audio')
                newAudioEle.controls = false
                newAudioEle.src = audioBaseUrl + name + '.ogg'
                newAudioEle.loop = true
                newAudioEle.play();
            }} musicNameList={categories[curCategory] || []}/>
        </div>
    )
}

export default Home
