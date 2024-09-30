'use client'

import React, { useState, useEffect } from 'react'
import { timeZoneList } from './TimeZone'

export default function ApplyAdManager() {
    const [adAccountType, setAdAccountType] = useState('')
    const [pageNumber, setPageNumber] = useState('')
    const [pageUrls, setPageUrls] = useState([])
    const [domainNumber, setDomainNumber] = useState('')
    const [domains, setDomains] = useState([])
    const [isApp, setIsApp] = useState(false)
    const [shopifyShop, setShopifyShop] = useState('')
    const [adAccountCount, setAdAccountCount] = useState('')
    const [adAccounts, setAdAccounts] = useState([])
    const [timezones, setTimezones] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setTimezones(timeZoneList)
    }, [])

    useEffect(() => {
        if (adAccountCount) {
            setAdAccounts(
                Array.from({ length: parseInt(adAccountCount, 10) }, () => ({
                    name: '',
                    timezone: '',
                    deposit: '',
                }))
            )
        } else {
            setAdAccounts([])
        }
    }, [adAccountCount])

    const handleAdAccountTypeChange = (e) => setAdAccountType(e.target.value)
    const handlePageNumberChange = (e) => setPageNumber(e.target.value)
    const handlePageUrlChange = (index) => (e) => {
        const newPageUrls = [...pageUrls]
        newPageUrls[index] = e.target.value
        setPageUrls(newPageUrls)
    }
    const handleDomainNumberChange = (e) => setDomainNumber(e.target.value)
    const handleDomainChange = (index) => (e) => {
        const newDomains = [...domains]
        newDomains[index] = e.target.value
        setDomains(newDomains)
    }
    const handleAdAccountCountChange = (e) => setAdAccountCount(e.target.value)
    const handleAdAccountChange = (index) => (e) => {
        const { name, value } = e.target
        const newAdAccounts = [...adAccounts]
        newAdAccounts[index] = { ...newAdAccounts[index], [name]: value }
        setAdAccounts(newAdAccounts)
    }

    const validateForm = () => {
        const newErrors = {}
        if (!adAccountType) newErrors.adAccountType = 'Ad Account Type is required.'
        if (!pageNumber) newErrors.pageNumber = 'Page Number is required.'
        if (pageNumber > 0 && pageUrls.some(url => !url)) newErrors.pageUrls = 'All Page URLs are required.'
        if (!domainNumber) newErrors.domainNumber = 'Number of Domains is required.'
        if (domainNumber > 0 && domains.some(domain => !domain)) newErrors.domains = 'All Domains are required.'
        if (adAccountCount > 0) {
            adAccounts.forEach((account, index) => {
                if (!account.name) newErrors[`adAccountName-${index}`] = `Ad Account Name is required for account ${index + 1}.`
                if (!account.timezone) newErrors[`adAccountTimezone-${index}`] = `Timezone is required for account ${index + 1}.`
                if (account.deposit === '') newErrors[`adAccountDeposit-${index}`] = `Deposit Amount is required for account ${index + 1}.`
            })
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            // If validation passes, log all form data
            const formData = {
                adAccountType,
                pageUrls,
                domains,
                isApp,
                shopifyShop,
                adAccounts,
            }
            console.log(formData)
            // You can add your API submission logic here
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-boxdark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    Apply for Ad Manager
                </h1>
                <form className="space-y-8 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ad Account Type</h2>
                        <select
                            id="adAccountType"
                            value={adAccountType}
                            onChange={handleAdAccountTypeChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        >
                            <option value="">Select an option</option>
                            <option value="facebook">Facebook</option>
                            <option value="google">Google</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                        {errors.adAccountType && <p className="text-red-500 text-sm">{errors.adAccountType}</p>}
                    </div>

                    {adAccountType && (
                        <>
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Page Details</h2>
                                <div>
                                    <label htmlFor="pageNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Page Number
                                    </label>
                                    <select
                                        id="pageNumber"
                                        value={pageNumber}
                                        onChange={handlePageNumberChange}
                                        className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Select number of pages</option>
                                        {[1, 2, 3, 4, 5].map((number) => (
                                            <option key={number} value={number}>
                                                {number}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pageNumber && <p className="text-red-500 text-sm">{errors.pageNumber}</p>}
                                </div>

                                {pageNumber > 0 && (
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page URLs</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {Array.from({ length: parseInt(pageNumber, 10) }).map((_, index) => (
                                                <input
                                                    key={index}
                                                    type="url"
                                                    value={pageUrls[index] || ''}
                                                    onChange={handlePageUrlChange(index)}
                                                    placeholder={`Page URL ${index + 1}`}
                                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                                />
                                            ))}
                                        </div>
                                        {errors.pageUrls && <p className="text-red-500 text-sm">{errors.pageUrls}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Domain Details</h2>
                                <div>
                                    <label htmlFor="domainNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Number of Domains
                                    </label>
                                    <select
                                        id="domainNumber"
                                        value={domainNumber}
                                        onChange={handleDomainNumberChange}
                                        className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Select number of domains</option>
                                        {[1, 2, 3, 4, 5].map((number) => (
                                            <option key={number} value={number}>
                                                {number}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.domainNumber && <p className="text-red-500 text-sm">{errors.domainNumber}</p>}
                                </div>

                                {domainNumber > 0 && (
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Domains</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {Array.from({ length: parseInt(domainNumber, 10) }).map((_, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    value={domains[index] || ''}
                                                    onChange={handleDomainChange(index)}
                                                    placeholder={`Domain ${index + 1}`}
                                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                                />
                                            ))}
                                        </div>
                                        {errors.domains && <p className="text-red-500 text-sm">{errors.domains}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ad Account Information</h2>
                                <div>
                                    <label htmlFor="adAccountCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Number of Ad Accounts
                                    </label>
                                    <select
                                        id="adAccountCount"
                                        value={adAccountCount}
                                        onChange={handleAdAccountCountChange}
                                        className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Select number of ad accounts</option>
                                        {[1, 2, 3, 4, 5].map((number) => (
                                            <option key={number} value={number}>
                                                {number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {adAccountCount > 0 && (
                                    <div className="space-y-4">
                                        {adAccounts.map((account, index) => (
                                            <div key={index} className="border p-4 rounded-md bg-gray-50 dark:bg-slate-700">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ad Account {index + 1}</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label htmlFor={`adAccountName-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Name
                                                        </label>
                                                        <input
                                                            id={`adAccountName-${index}`}
                                                            name="name"
                                                            type="text"
                                                            value={account.name}
                                                            onChange={handleAdAccountChange(index)}
                                                            className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                                        />
                                                        {errors[`adAccountName-${index}`] && <p className="text-red-500 text-sm">{errors[`adAccountName-${index}`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label htmlFor={`adAccountTimezone-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Timezone
                                                        </label>
                                                        <select
                                                            id={`adAccountTimezone-${index}`}
                                                            name="timezone"
                                                            value={account.title}
                                                            onChange={handleAdAccountChange(index)}
                                                            className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                                        >
                                                            <option value="">Select Timezone</option>
                                                            {timezones.map((timezone) => (
                                                                <option key={timezone.name} value={timezone.title}>
                                                                    {timezone.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors[`adAccountTimezone-${index}`] && <p className="text-red-500 text-sm">{errors[`adAccountTimezone-${index}`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label htmlFor={`adAccountDeposit-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Deposit Amount
                                                        </label>
                                                        <input
                                                            id={`adAccountDeposit-${index}`}
                                                            name="deposit"
                                                            type="number"
                                                            value={account.deposit}
                                                            onChange={handleAdAccountChange(index)}
                                                            className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                                        />
                                                        {errors[`adAccountDeposit-${index}`] && <p className="text-red-500 text-sm">{errors[`adAccountDeposit-${index}`]}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isApp}
                                        onChange={() => setIsApp(!isApp)}
                                        className="mr-2"
                                    />
                                    This is an app-related account
                                </label>

                                {isApp && (
                                    <div>
                                        <label htmlFor="shopifyShop" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Shopify Shop URL
                                        </label>
                                        <input
                                            id="shopifyShop"
                                            type="url"
                                            value={shopifyShop}
                                            onChange={(e) => setShopifyShop(e.target.value)}
                                            placeholder="Enter Shopify Shop URL"
                                            className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    )
}
