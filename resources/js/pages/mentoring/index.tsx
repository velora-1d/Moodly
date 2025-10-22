import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, mentoring as mentoringRoute } from '@/routes';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import HeroBanner from './components/sections/hero-banner';
import CourseCurriculum from './components/sections/course-curriculum';
import Footer from './components/sections/footer';

export default function MentoringPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Mentoring', href: mentoringRoute().url },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mentoring" />
      <div className="space-y-8 p-4">
        <HeroBanner />
        <CourseCurriculum />
        <Footer />
      </div>
    </AppLayout>
  );
}