"use client";

import { useState, FormEvent } from "react";
import ScrollReveal from "./animations/ScrollReveal";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "请输入您的姓名";
    }

    if (!formData.email.trim()) {
      newErrors.email = "请输入您的邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "请输入主题";
    }

    if (!formData.message.trim()) {
      newErrors.message = "请输入留言内容";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // 创建 mailto 链接
    const subject = encodeURIComponent(`[Circuit Soul] ${formData.subject}`);
    const body = encodeURIComponent(
      `姓名: ${formData.name}\n邮箱: ${formData.email}\n\n留言内容:\n${formData.message}`
    );
    
    window.location.href = `mailto:xlkang@example.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <ScrollReveal>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">邮件客户端已打开</h3>
          <p className="text-[var(--accent)]/70 mb-6">
            请在邮件客户端中完成发送
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
            className="px-6 py-2 border border-[var(--border-color)] rounded hover:bg-[var(--accent-dim)] transition-colors"
          >
            发送另一条消息
          </button>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 姓名 */}
          <div>
            <label className="block text-sm mb-2">
              姓名 <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm mb-2">
              邮箱 <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* 主题 */}
        <div>
          <label className="block text-sm mb-2">
            主题 <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors"
            placeholder="Message subject"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* 消息 */}
        <div>
          <label className="block text-sm mb-2">
            留言 <span className="text-[var(--accent)]">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full py-3 bg-[var(--accent)] text-[var(--background)] font-bold rounded hover:opacity-80 transition-opacity"
        >
          发送消息
        </button>

        <p className="text-center text-sm text-[var(--accent)]/50">
          点击发送后，将打开您的默认邮件客户端
        </p>
      </form>
    </ScrollReveal>
  );
}
