import SlidingMenu, { SlidingItem, SlidingContext } from './SlidingMenu'
/* Respectively: Map, Statistics, Friends, Challenges, Settings */
import {
    MapTrifold,
    TrendUp,
    Users,
    CheckCircle,
    Gear
} from '@phosphor-icons/react'


export default function SlidingWrapper({ expanded, setExpanded }) {
    return (
        <div>
            <SlidingMenu expanded={expanded} setExpanded={setExpanded}>
                <SlidingItem
                    icon={<MapTrifold size={60} weight='duotone' />}
                    text={'Map'}
                    active={true}
                    alert={true}
                />
                <SlidingItem
                    icon={<TrendUp size={60} weight='duotone' />}
                    text={'Statistics'}
                    active={true}
                    alert={true}
                />
                <SlidingItem
                    icon={<Users size={60} weight='duotone' />}
                    text={'Friends'}
                    active={true}
                    alert={false}
                />
                <SlidingItem
                    icon={<CheckCircle size={60} weight='duotone' />}
                    text={'Challenges'}
                    active={true}
                    alert={true}
                />
                <SlidingItem
                    icon={<Gear size={60} weight='duotone' />}
                    text={'Settings'}
                    active={true}
                    alert={true}
                />
            </SlidingMenu>)
        </div>
    )
}


