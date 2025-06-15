import React from 'react'
import { Button } from '@/components/ui/button'

const UpgradeBanner = () => {
  return (
    <div className="bg-gradient-to-t from-primary/10 to-primary/30 border border-violet-400 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Unlock all models + higher limits</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-violet-500">$8</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UpgradeBanner
