import DishesCard from "../components/DishesCard";
import NextStepCard from "../components/NextStepCard";

export default function DishesPage() {
    return (
        <div className="grid grid-cols-3 grid-row-3 h-screen gap-8 pt-32 pb-8 text-white drop-shadow-lg">
            <div className="col-span-2 row-span-3 bg-request-orange rounded-xl">
                <DishesCard/>
            </div>
            <div className="grid-cols-1 grid-row-1 bg-request-orange rounded-xl">
                <NextStepCard/>
            </div>
        </div>
    )
}