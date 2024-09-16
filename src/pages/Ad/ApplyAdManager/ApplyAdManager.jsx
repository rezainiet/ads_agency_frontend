import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const ApplyAdManager = () => {
    // State for selected ad account type
    const [adAccountType, setAdAccountType] = useState('');
    // State for selected page number
    const [pageNumber, setPageNumber] = useState('');
    // State for page URLs
    const [pageUrls, setPageUrls] = useState([]);
    // State for number of domains
    const [domainNumber, setDomainNumber] = useState('');
    // State for domains
    const [domains, setDomains] = useState([]);
    // State for app boolean
    const [isApp, setIsApp] = useState(false);
    // State for Shopify shop
    const [shopifyShop, setShopifyShop] = useState('');
    // State for number of ad accounts
    const [adAccountCount, setAdAccountCount] = useState('');
    // State for ad accounts details
    const [adAccounts, setAdAccounts] = useState([]);
    // State for timezones
    const [timezones, setTimezones] = useState([]);

    // Initialize timezones on component mount
    useEffect(() => {
        const tzList = moment.tz.names().map((tz) => ({
            name: tz,
            offset: moment.tz(tz).format('Z'),
            fullName: `${moment.tz(tz).format('z')} ${tz}`,
        }));

        // Sort timezones by offset
        tzList.sort((a, b) => {
            const offsetA = a.offset.replace(':', '');
            const offsetB = b.offset.replace(':', '');
            return offsetA.localeCompare(offsetB);
        });

        setTimezones(tzList);
    }, []);

    // Update adAccounts when adAccountCount changes
    useEffect(() => {
        if (adAccountCount) {
            setAdAccounts(
                Array.from({ length: parseInt(adAccountCount, 10) }, () => ({
                    name: '',
                    timezone: '',
                    deposit: '',
                }))
            );
        } else {
            setAdAccounts([]);
        }
    }, [adAccountCount]);

    // Handlers
    const handleAdAccountTypeChange = (e) => setAdAccountType(e.target.value);
    const handlePageNumberChange = (e) => setPageNumber(e.target.value);
    const handlePageUrlChange = (index) => (e) => {
        const newPageUrls = [...pageUrls];
        newPageUrls[index] = e.target.value;
        setPageUrls(newPageUrls);
    };
    const handleDomainNumberChange = (e) => setDomainNumber(e.target.value);
    const handleDomainChange = (index) => (e) => {
        const newDomains = [...domains];
        newDomains[index] = e.target.value;
        setDomains(newDomains);
    };
    const handleAdAccountCountChange = (e) => setAdAccountCount(e.target.value);
    const handleAdAccountChange = (index) => (e) => {
        const { name, value } = e.target;
        const newAdAccounts = [...adAccounts];
        newAdAccounts[index] = { ...newAdAccounts[index], [name]: value };
        setAdAccounts(newAdAccounts);
    };

    return (
        <div
            className={`p-6 max-w-3xl mx-auto rounded-lg shadow-lg ${document.documentElement.classList.contains('dark')
                ? 'bg-[#1A202C] text-[#E2E8F0]'
                : 'bg-[#F7FAFC] text-[#2D3748]'
                }`}
        >
            <h1 className="text-3xl font-semibold mb-6 text-center">Apply for Ad Manager</h1>

            <form className="space-y-8">
                <div
                    className="p-6 rounded-lg shadow-md"
                    style={{
                        backgroundColor: document.documentElement.classList.contains('dark')
                            ? '#2D3748'
                            : '#FFFFFF',
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4">Ad Account Type</h2>
                    <select
                        id="adAccountType"
                        value={adAccountType}
                        onChange={handleAdAccountTypeChange}
                        className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                    >
                        <option value="">Select an option</option>
                        <option value="facebook">Facebook</option>
                        <option value="google">Google</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                </div>

                {adAccountType && (
                    <>
                        <div
                            className="p-6 rounded-lg shadow-md"
                            style={{
                                backgroundColor: document.documentElement.classList.contains('dark')
                                    ? '#2D3748'
                                    : '#FFFFFF',
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Page Details</h2>
                            <div>
                                <label htmlFor="pageNumber" className="block text-sm font-medium">
                                    Page Number
                                </label>
                                <select
                                    id="pageNumber"
                                    value={pageNumber}
                                    onChange={handlePageNumberChange}
                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                >
                                    <option value="">Select number of pages</option>
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {pageNumber > 0 && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium">Page URLs</label>
                                    {Array.from({ length: parseInt(pageNumber, 10) }).map((_, index) => (
                                        <div key={index} className="mb-4">
                                            <input
                                                type="url"
                                                value={pageUrls[index] || ''}
                                                onChange={handlePageUrlChange(index)}
                                                placeholder={`Page URL ${index + 1}`}
                                                className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div
                            className="p-6 rounded-lg shadow-md"
                            style={{
                                backgroundColor: document.documentElement.classList.contains('dark')
                                    ? '#2D3748'
                                    : '#FFFFFF',
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Domain Details</h2>
                            <div>
                                <label htmlFor="domainNumber" className="block text-sm font-medium">
                                    Number of Domains
                                </label>
                                <select
                                    id="domainNumber"
                                    value={domainNumber}
                                    onChange={handleDomainNumberChange}
                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                >
                                    <option value="">Select number of domains</option>
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {domainNumber > 0 && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium">Domains</label>
                                    {Array.from({ length: parseInt(domainNumber, 10) }).map((_, index) => (
                                        <div key={index} className="mb-4">
                                            <input
                                                type="text"
                                                value={domains[index] || ''}
                                                onChange={handleDomainChange(index)}
                                                placeholder={`Domain ${index + 1}`}
                                                className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div
                            className="p-6 rounded-lg shadow-md"
                            style={{
                                backgroundColor: document.documentElement.classList.contains('dark')
                                    ? '#2D3748'
                                    : '#FFFFFF',
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={isApp}
                                    onChange={() => setIsApp(!isApp)}
                                    id="isApp"
                                />
                                <label htmlFor="isApp" className="text-sm font-medium">
                                    Is this an app?
                                </label>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="shopifyShop" className="block text-sm font-medium">
                                    Do you have a Shopify shop?
                                </label>
                                <input
                                    id="shopifyShop"
                                    type="text"
                                    value={shopifyShop}
                                    onChange={(e) => setShopifyShop(e.target.value)}
                                    placeholder="Shopify shop URL or name"
                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        <div
                            className="p-6 rounded-lg shadow-md"
                            style={{
                                backgroundColor: document.documentElement.classList.contains('dark')
                                    ? '#2D3748'
                                    : '#FFFFFF',
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Ad Account Details</h2>
                            <div>
                                <label htmlFor="adAccountCount" className="block text-sm font-medium">
                                    Number of Ad Accounts
                                </label>
                                <select
                                    id="adAccountCount"
                                    value={adAccountCount}
                                    onChange={handleAdAccountCountChange}
                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
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
                                <div className="mt-4">
                                    {Array.from({ length: parseInt(adAccountCount, 10) }).map((_, index) => (
                                        <div key={index} className="mb-4 p-4 border border-[#CBD5E0] rounded-md">
                                            <h3 className="font-semibold mb-2">Ad Account {index + 1}</h3>
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={adAccounts[index]?.name || ''}
                                                    onChange={handleAdAccountChange(index)}
                                                    placeholder={`Ad Account Name ${index + 1}`}
                                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <select
                                                    name="timezone"
                                                    value={adAccounts[index]?.timezone || ''}
                                                    onChange={handleAdAccountChange(index)}
                                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                                >
                                                    <option value="">Select Timezone</option>
                                                    {timezones.map((tz) => (
                                                        <option key={tz.name} value={tz.name}>
                                                            {tz.fullName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="deposit"
                                                    value={adAccounts[index]?.deposit || ''}
                                                    onChange={handleAdAccountChange(index)}
                                                    placeholder={`Deposit Amount for Ad Account ${index + 1}`}
                                                    className="w-full p-3 border border-[#CBD5E0] rounded-md shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-[#3182CE] text-white font-semibold shadow-md"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ApplyAdManager;
