import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BreadCrumbs({items}) {
    return (
        <nav aria-label="breadcrumb" className="text-sm bg-theme-100">
          <ol className="max-w-2xl lg:max-w-7xl mx-auto py-2 px-4 flex space-x-2 text-gray-500">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-theme-900">
                    {item.label}
                  </span>
                )}
                {index < items.length - 1 && <span className="mx-2">/</span>}
              </li>
            ))}
          </ol>
        </nav>
      );
}

BreadCrumbs.propTypes = {
    items: PropTypes.array
}