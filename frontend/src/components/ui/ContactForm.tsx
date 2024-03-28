import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    message: string;
  }

export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      message: '',
    });
  
    // ChangeEvent<HTMLInputElement> と ChangeEvent<HTMLTextAreaElement> の両方を扱えるようにする
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        alert('送信しました');
        e.preventDefault();
        const response = await fetch('http://localhost:8787/contact', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        // 追加の処理（送信確認など）
    };

  return (
    <div className="flex flex-col bg-black">
        <div className="self-center mt-12 text-3xl font-bold text-white max-md:mt-10 max-md:max-w-full w-[1022px]">
        お問い合わせ
        </div>
        <form className="flex flex-col self-center mt-20 max-w-full w-[822px] max-md:mt-10" onSubmit={handleSubmit}>
            <div className="flex gap-5 justify-between px-5 text-base font-bold text-white max-md:flex-wrap max-md:max-w-full">
                <div className="my-auto">お名前 *</div>
                <input type="name" name="name" value={formData.name} onChange={handleChange} className="shrink-0 max-w-full rounded-xl border-0 border-white border-solid bg-zinc-800 h-[42px] w-[600px] px-4" />
            </div>
            <div className="flex gap-5 justify-between px-5 mt-10 text-base font-bold text-white max-md:flex-wrap max-md:max-w-full">
                <div className="my-auto">メールアドレス *</div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="shrink-0 max-w-full rounded-xl border-0 border-white border-solid bg-zinc-800 h-[42px] w-[600px] px-4" />
            </div>
            <div className="px-5 py-px mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
                    <div className="self-stretch my-auto text-base font-bold text-white max-md:mt-10">
                    お問い合わせ内容 *
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full text-white">
                    <textarea name="message" value={formData.message} onChange={handleChange} className="shrink-0 mx-auto max-w-full rounded-xl border-0 border-white border-solid bg-zinc-800 h-[230px] w-[600px] max-md:mt-10 px-4 py-4" />
                </div>
                </div>
            </div>
            <button type="submit" className="justify-center self-center p-3.5 mt-10 text-sm font-bold text-white bg-black rounded-xl border border-white border-solid">
                送信する →
            </button>
        </form>
        <div className="flex flex-col items-start pt-14 pr-20 pb-8 pl-10 mt-20 w-full text-white whitespace-nowrap bg-black border-0 border-white border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
        </div>
    </div>
  );
}