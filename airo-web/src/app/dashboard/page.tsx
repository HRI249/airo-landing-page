import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Activity, Apple, Flame, ChevronRight, Settings, Utensils, Camera } from "lucide-react";

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }
  
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="min-h-screen bg-black pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Welcome back, {firstName}.
          </h1>
          <p className="text-lg" style={{ color: "#86868b" }}>
            Here is your metabolic overview for today.
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl flex flex-col justify-between" style={{ minHeight: "160px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#4ade80" }}>Calories</span>
              <Flame className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">1,240 <span className="text-lg text-[#86868b] font-medium">/ 2,400</span></div>
              <div className="w-full h-2 rounded-full overflow-hidden mt-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full rounded-full" style={{ width: "52%", background: "linear-gradient(90deg, #175e29, #4ade80)" }} />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl flex flex-col justify-between" style={{ minHeight: "160px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#4ade80" }}>Protein</span>
              <Utensils className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">85g <span className="text-lg text-[#86868b] font-medium">/ 160g</span></div>
              <div className="w-full h-2 rounded-full overflow-hidden mt-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full rounded-full" style={{ width: "53%", background: "linear-gradient(90deg, #175e29, #4ade80)" }} />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl flex flex-col justify-between" style={{ minHeight: "160px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#4ade80" }}>Activity score</span>
              <Activity className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">92<span className="text-lg text-[#86868b] font-medium">/100</span></div>
              <div className="text-sm mt-3 flex items-center gap-1 font-medium" style={{ color: "#4ade80" }}>
                <span>↑ 12% from yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Today's Meals</h2>
            
            <div className="rounded-3xl p-5 flex items-center gap-5 transition-colors hover:bg-[#111] cursor-pointer" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
               <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#161616] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-2xl">
                 🥑
               </div>
               <div className="flex-1">
                 <h3 className="text-lg font-semibold text-white">Avocado Toast & Eggs</h3>
                 <p className="text-sm" style={{ color: "#86868b" }}>8:30 AM • 450 kcal</p>
               </div>
               <div className="text-right flex flex-col items-end">
                 <span className="text-sm font-medium text-white mb-1">22g Protein</span>
                 <ChevronRight className="w-5 h-5" style={{ color: "#6e6e73" }} />
               </div>
            </div>

            <div className="rounded-3xl p-5 flex items-center gap-5 transition-colors hover:bg-[#111] cursor-pointer" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
               <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#161616] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-2xl">
                 🥗
               </div>
               <div className="flex-1">
                 <h3 className="text-lg font-semibold text-white">Grilled Chicken Salad</h3>
                 <p className="text-sm" style={{ color: "#86868b" }}>1:15 PM • 520 kcal</p>
               </div>
               <div className="text-right flex flex-col items-end">
                 <span className="text-sm font-medium text-white mb-1">45g Protein</span>
                 <ChevronRight className="w-5 h-5" style={{ color: "#6e6e73" }} />
               </div>
            </div>

            <button className="w-full py-5 border border-[rgba(255,255,255,0.08)] rounded-3xl border-dashed text-[#86868b] font-medium hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer">
              <Camera className="w-5 h-5" />
              Log new meal
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Integrations</h2>
            
            <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-black border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                     <Apple className="w-6 h-6 text-white" />
                   </div>
                   <div>
                     <div className="font-semibold text-white text-base">Apple Health</div>
                     <div className="text-sm text-[#4ade80] mt-0.5">Connected</div>
                   </div>
                 </div>
                 <Settings className="w-5 h-5 text-[#86868b] cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="flex items-center justify-between opacity-50 grayscale pt-6 mt-2 pb-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-black border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                     <span className="font-bold text-white text-sm">GF</span>
                   </div>
                   <div>
                     <div className="font-semibold text-white text-base">Google Fit</div>
                     <div className="text-sm text-[#86868b] mt-0.5">Coming soon</div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 mt-6 relative overflow-hidden group" style={{ background: "linear-gradient(145deg, rgba(23,94,41,0.2), rgba(0,0,0,0))", border: "1px solid rgba(74, 222, 128, 0.15)" }}>
               <h3 className="font-bold text-white mb-3 text-lg">Airo Intelligence</h3>
               <p className="text-base text-[#86868b] leading-relaxed mb-5">
                Based on your recent meals, you are 30g short on your daily protein goal. 
                We suggest a protein shake or Greek yogurt for your next snack.
               </p>
               <button className="text-sm font-semibold text-[#4ade80] hover:text-white transition-colors cursor-pointer">View personalized suggestions →</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
