import React, { useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const AddMoney = () => {
    const [amount, setAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('usdt');
    const [image, setImage] = useState(null);
    const [imageLink, setImageLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const depositAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Example deposit address

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            console.error('Please upload an image.');
            return;
        }

        setLoading(true);

        try {
            // Upload image to ImgBB
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData);
            const imgLink = response.data.data.url;
            setImageLink(imgLink);

            // Log the form data including ImgBB image link
            console.log({
                amount,
                transactionId,
                paymentMethod,
                imgLink,
            });
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-xl shadow-lg border border-[#D1D5DB] dark:border-[#4B5563] flex flex-col md:flex-row">
            <div className="flex-1 mb-6 md:mb-0">
                <h2 className="text-3xl font-extrabold mb-6 text-[#1F2937] dark:text-[#F9FAFB]">Add Money</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#F9FAFB] dark:bg-[#1F2937] p-4 rounded-lg shadow-sm">
                        <label className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB]">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-[#D1D5DB] dark:border-[#4B5563] rounded-md mt-2 bg-white dark:bg-[#4B5563] text-[#1F2937] dark:text-[#F9FAFB]"
                            placeholder="Enter Amount"
                        />
                    </div>
                    <div className="bg-[#F9FAFB] dark:bg-[#1F2937] p-4 rounded-lg shadow-sm">
                        <label className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB]">Transaction ID</label>
                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full p-3 border border-[#D1D5DB] dark:border-[#4B5563] rounded-md mt-2 bg-white dark:bg-[#4B5563] text-[#1F2937] dark:text-[#F9FAFB]"
                            placeholder="Enter Transaction ID"
                        />
                    </div>
                    <div className="bg-[#F9FAFB] dark:bg-[#1F2937] p-4 rounded-lg shadow-sm">
                        <label className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB]">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 border border-[#D1D5DB] dark:border-[#4B5563] rounded-md mt-2 bg-white dark:bg-[#4B5563] text-[#1F2937] dark:text-[#F9FAFB]"
                        >
                            <option value="usdt">USDT</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div className="bg-[#F9FAFB] dark:bg-[#1F2937] p-4 rounded-lg shadow-sm">
                        <label className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB]">Proof of Payment</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-[#D1D5DB] dark:border-[#4B5563] rounded-md mt-2 bg-white dark:bg-[#4B5563]"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-md ${loading ? 'bg-slate-400' : 'bg-blue-600 dark:bg-blue-500'} text-white flex items-center justify-center`}
                        disabled={loading}
                    >
                        {loading ? (
                            <Circles color="#ffffff" height={24} width={24} />
                        ) : (
                            'Add Money'
                        )}
                    </button>
                </form>
            </div>
            {paymentMethod === 'usdt' && (
                <div className="md:ml-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 flex flex-col items-center transition-all duration-300 ease-in-out">
                    <label className="block text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Deposit Address</label>
                    <div className="relative w-full flex items-center">
                        <input
                            type="text"
                            value={depositAddress}
                            readOnly
                            className="w-full p-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        />
                        <CopyToClipboard
                            text={depositAddress}
                            onCopy={() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                        >
                            <button
                                type="button"
                                className="absolute top-2 right-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddMoney;
