import React, { useState } from 'react';
import MealPlanCard from './MealPlanCard';

export default function MealPlanList({ days }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Calculate pagination
    const totalPages = Math.ceil(days.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDays = days.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-6">
            {/* List of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentDays.map((day) => (
                    <MealPlanCard key={day.day} dayData={day} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-white/70 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
