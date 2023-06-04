import React from "react";
import "../../assets/Profit.css";
import CountUp from "react-countup";

export const Profit = ({ jobs }) => {
  const getProfitForPeriod = (startDate) => {
    let totalProfit = 0;

    for (const job of jobs) {
      const jobDate = new Date(job.createdAt);
      if (jobDate >= startDate) {
        totalProfit += Number(job.totalCost);
      }
    }
    return totalProfit;
  };

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth());
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const yearlyProfit = getProfitForPeriod(startOfYear);
  const monthlyProfit = getProfitForPeriod(startOfMonth);
  const dailyProfit = getProfitForPeriod(startOfDay);
  return (
    <div className="profit-container">
      <div className="profit-card yearly">
        <div className="profit-title">Yearly</div>
        <div className="profit-amount">
          <CountUp end={yearlyProfit} duration={2.75} />$
        </div>
      </div>
      <div className="profit-card monthly">
        <div className="profit-title">Monthly</div>
        <div className="profit-amount">
          <CountUp end={monthlyProfit} duration={2.75} />$
        </div>
      </div>

      <div className="profit-card daily">
        <div className="profit-title">Daily</div>
        <div className="profit-amount">
          <CountUp end={dailyProfit} duration={2.75} />$
        </div>
      </div>
    </div>
  );
};
