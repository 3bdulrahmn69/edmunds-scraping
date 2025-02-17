/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import CarForm from './car-form';

const HomePage = () => {
  const [data, setData] = useState<{ key: string; value: string }[] | null>(
    null
  );
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMake, setSelectedMake] = useState('none');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Edmunds Car Reviews Scraper
          </h1>
          <p className="text-lg text-gray-600">
            Discover comprehensive vehicle specifications and reviews
          </p>
        </header>

        {!data && (
          <div className="flex items-center justify-center animate-fade-in-up">
            <CarForm
              setData={setData}
              setImgUrl={setImgUrl}
              setLoading={setLoading}
              selectedMake={selectedMake}
              selectedModel={selectedModel}
              selectedYear={selectedYear}
              setSelectedMake={setSelectedMake}
              setSelectedModel={setSelectedModel}
              setSelectedYear={setSelectedYear}
            />
          </div>
        )}

        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="text-gray-600 font-medium">
              Analyzing vehicle data...
            </p>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-shake">
            <div className="text-center">
              <div className="mb-4 text-red-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Data Found for {selectedMake.split('-').join(' ')}{' '}
                {selectedModel} ({selectedYear})
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any information for this vehicle
                configuration.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setData(null)}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  Try Again
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Visit{' '}
                  <a
                    href="https://www.edmunds.com/car-reviews"
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    Edmunds.com
                  </a>{' '}
                  for available car reviews.
                </p>
              </div>
            </div>
          </div>
        )}

        {data && data.length >= 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {imgUrl && (
                <div className="mb-12 text-center transform transition-transform duration-300 hover:scale-105">
                  <div className="inline-block bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={`${selectedMake} ${selectedModel} ${selectedYear} car`}
                      className="w-full max-w-2xl object-cover"
                      width={800}
                      height={500}
                    />
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-blue-500">
                  <h2 className="text-2xl font-bold text-white">
                    Vehicle Specifications
                    <span className="block mt-1 text-sm font-medium text-indigo-100">
                      {selectedYear} {selectedMake} {selectedModel}
                    </span>
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map(
                        (item, index) =>
                          item.key !== 'Unknown' && (
                            <tr
                              key={index}
                              className="transition-all duration-150 hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.key}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {item.value}
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Data sourced from verified automotive databases
                    </p>
                    <button
                      onClick={() => {
                        setData(null);
                        setImgUrl(null);
                        setSelectedMake('none');
                        setSelectedModel('');
                        setSelectedYear('');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                    >
                      Search Another Vehicle
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
