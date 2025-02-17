'use client';

import { useEffect, useState } from 'react';

interface CarFormProps {
  setData: (data: { key: string; value: string }[] | null) => void;
  setImgUrl: (imgUrl: string | null) => void;
  setLoading: (loading: boolean) => void;
  selectedMake: string;
  selectedModel: string;
  selectedYear: string;
  setSelectedMake: (make: string) => void;
  setSelectedModel: (model: string) => void;
  setSelectedYear: (year: string) => void;
  setError: (error: string) => void;
}

const CarForm = ({
  setData,
  setImgUrl,
  setLoading,
  selectedMake,
  selectedModel,
  selectedYear,
  setSelectedMake,
  setSelectedModel,
  setSelectedYear,
  setError,
}: CarFormProps) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    const getMakes = async () => {
      try {
        setInnerLoading(true);
        const response = await fetch(`/api/get-makes`, { method: 'GET' });

        if (!response.ok) throw new Error('Failed to fetch makes');

        const result = await response.json();
        if (result.data.makes.length === 0) console.log('No makes found');

        setMakes(result.data.makes);
      } catch (error) {
        console.error('Fetching makes failed:', error);
      } finally {
        setInnerLoading(false);
      }
    };

    getMakes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      selectedMake === 'none' ||
      selectedModel === 'none' ||
      selectedYear === 'none'
    ) {
      alert('Please enter all fields correctly.');
      return;
    }

    setData(null);
    setImgUrl(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/get-reviews?year=${encodeURIComponent(
          selectedYear
        )}&make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(
          selectedModel
        )}`,
        { method: 'GET' }
      );

      const result = await response.json();
      setData(result.data.data);
      setImgUrl(result.data.carImg);
    } catch (error) {
      console.error('Fetching reviews failed:', error);
      setError('Failed to fetch reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black rounded-lg w-fit py-8 px-6">
      {innerLoading && (
        <div>
          <p>loading data...</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
        <select
          name="make"
          id="make"
          onChange={(e) => {
            const selectedMake = e.target.value;
            setSelectedMake(selectedMake);
          }}
          value={selectedMake}
          className="p-2 border-2 border-black rounded disabled:border-gray-100"
          disabled={makes.length === 0}
        >
          <option value="none" disabled>
            Select Make
          </option>
          {makes.map((item, index) => (
            <option key={index} value={item.toLowerCase().replace(/\s+/g, '-')}>
              {item}
            </option>
          ))}
        </select>
        <input
          name="model"
          id="model"
          placeholder="Model"
          onChange={(e) => {
            setSelectedModel(e.target.value);
          }}
          value={selectedModel}
          disabled={selectedMake === 'none'}
          className="p-2 border-2 border-black rounded disabled:border-gray-100"
        />
        <input
          name="year"
          id="year"
          placeholder="Year"
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          disabled={selectedModel === ''}
          className="p-2 border-2 border-black rounded disabled:border-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded disabled:bg-blue-100"
          disabled={
            selectedMake === 'none' ||
            selectedModel === '' ||
            selectedYear === ''
          }
        >
          Get Car Info
        </button>
      </form>
    </div>
  );
};

export default CarForm;
