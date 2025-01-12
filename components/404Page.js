import React from 'react';
import { Construction, Github, ArrowLeft } from 'lucide-react';

const ProjectStatus = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Status Icon */}
        <div className="flex justify-center">
          <Construction className="w-24 h-24 text-yellow-500 animate-pulse" />
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-anothertextcolor">
            Project Under Development
          </h1>
          <p className="text-xl text-anothertextcolor">
            The FitHub Gym Application is currently being built with 
            <span className="text-yellow-500"> cutting-edge technologies</span>
          </p>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
          <h2 className="text-xl font-semibold text-anothertextcolor mb-4">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-anothertextcolor">Django</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-anothertextcolor">React</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-anothertextcolor">Tailwind CSS</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-anothertextcolor">Framer-motion</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/home"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-anothertextcolor bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </a>
          <a
            href="https://github.com/BadrinathM6/Gym-application"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-black bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </a>
        </div>

        {/* Timeline */}
        <div className="text-anothertextcolor">
          <p>Expected Launch: 02 2025</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;