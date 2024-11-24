import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedPackage } from '../../redux/slices/subscriptionSlice';

const PackageSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, selectedPackage } = useSelector((state) => state.subscription);

  const handlePackageSelect = (packageId) => {
    dispatch(setSelectedPackage(packageId));
    // In a real app, this would navigate to a payment page
    navigate('/payment');
  };

  const renderFeatureList = (features) => {
    return features.map((feature, index) => (
      <li key={index} className="flex items-center mb-2">
        <svg
          className="w-4 h-4 mr-2 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {feature}
      </li>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Package
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the package that best suits your healthcare needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                pkg.isPopular ? 'border-2 border-blue-500' : ''
              }`}
            >
              <div className="p-6 bg-white rounded-t-lg">
                {pkg.isPopular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 mb-4">
                    Popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-gray-900">
                  {pkg.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${pkg.price}
                  </span>
                  {pkg.price > 0 && (
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    pkg.isPopular
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  Select {pkg.name}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8 bg-white rounded-b-lg">
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">{renderFeatureList(pkg.features)}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;