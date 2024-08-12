import SlidingMenu, { SlidingItem, SlidingContext } from './SlidingMenu'
/* Respectively: Map, Statistics, Friends, Challenges, Settings */
import {
    MapTrifold,
    TrendUp,
    Users,
    CheckCircle,
    Gear,
    PlusCircle,
    Clock
} from '@phosphor-icons/react'


export default function SlidingWrapper({ expanded, setExpanded }:
    { expanded: boolean, setExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (

        <div>
            <SlidingMenu expanded={expanded} setExpanded={setExpanded}>
                <SlidingItem
                    icon={<MapTrifold size={60} weight='duotone' />}
                    text={"Map"}
                    alert={false}
                    link={'map'}
                />
                <SlidingItem
                    icon={<TrendUp size={60} weight='duotone' />}
                    text={'Statistics'}
                    alert={false}
                    link={'statistics'}

                />
                <SlidingItem
                    icon={<Users size={60} weight='duotone' />}
                    text={'Friends'}
                    alert={false}
                    link={'friends'}
                />
                <SlidingItem
                    icon={<CheckCircle size={60} weight='duotone' />}
                    text={'Challenges'}
                    alert={false}
                    link={'challenges'}

                />
                <SlidingItem
                    icon={<Gear size={60} weight='duotone' />}
                    text={'Settings'}
                    alert={false}
                    link={'settings'}
                />
                <SlidingItem
                    icon={<PlusCircle size={60} weight='duotone' />}
                    text={'Add Flight'}
                    alert={true}
                    link={'add-flight'}
                />
                <SlidingItem
                    icon={<Clock size={60} weight='duotone' />}
                    text={'Recent Flights'}
                    alert={true}
                    link={'recent-flights'}
                />
            </SlidingMenu>
        </div>
    )
}


