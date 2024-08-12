import React from 'react'

import './Category.css'
import CategoryPagination from './CategoryPagination'
import GetCategory from './GetCategory'

export default function HomeCategory() {
    return (<div>
        <GetCategory />
        <CategoryPagination />
    </div>
    )
}
