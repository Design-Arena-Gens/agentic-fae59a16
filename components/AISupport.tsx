'use client';

import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AISupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your IT Support AI Assistant. I can help you with Level 1 & Level 2 support tasks including password resets, software troubleshooting, hardware issues, VPN problems, and more. How can I assist you today?',
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'How do I reset a user\'s password?',
    'VPN connection troubleshooting steps',
    'Setup new employee workstation',
    'Printer not responding - what to check?',
    'Software installation request process',
    'How to escalate a ticket to L2?',
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        password: 'To reset a user\'s password:\n\n1. Navigate to Active Directory Users and Computers\n2. Locate the user account\n3. Right-click and select "Reset Password"\n4. Enter new temporary password (must meet complexity requirements)\n5. Check "User must change password at next logon"\n6. Create a ServiceNow ticket documenting the action\n7. Notify user via secure channel\n\nAlternatively, you can use the self-service portal if enabled. Would you like me to create a ticket for this action?',
        vpn: 'VPN troubleshooting steps:\n\n1. **Basic Checks:**\n   - Verify internet connectivity\n   - Confirm VPN credentials are correct\n   - Check if VPN client is up to date\n\n2. **Common Issues:**\n   - Firewall blocking VPN ports (UDP 500, 4500)\n   - Certificate expiration\n   - Network adapter issues\n\n3. **Resolution Steps:**\n   - Restart VPN client\n   - Flush DNS: `ipconfig /flushdns`\n   - Reset network adapter\n   - Reinstall VPN client if needed\n\n4. **Escalation:** If issue persists after these steps, escalate to Network team with error logs.\n\nWould you like me to generate a troubleshooting ticket?',
        workstation: 'New Employee Workstation Setup Checklist:\n\n**Hardware:**\n- [ ] Laptop/Desktop configured with approved image\n- [ ] Monitor, keyboard, mouse\n- [ ] Docking station (if applicable)\n- [ ] Mobile device provisioning\n\n**Software:**\n- [ ] Windows 10/11 or macOS installed\n- [ ] Office 365 suite\n- [ ] VPN client\n- [ ] Antivirus/EDR agent\n- [ ] Department-specific applications\n\n**Access:**\n- [ ] Active Directory account created\n- [ ] Email account provisioned\n- [ ] Network shares mapped\n- [ ] Application access granted per manager approval\n\n**Documentation:**\n- [ ] Asset tag recorded\n- [ ] ServiceNow ticket created\n- [ ] User training scheduled\n\nEstimated time: 2-3 hours. Would you like me to create an onboarding ticket?',
        printer: 'Printer Troubleshooting Guide:\n\n**Level 1 Checks:**\n1. Physical inspection:\n   - Power cable connected\n   - Paper loaded correctly\n   - No paper jams\n   - Check error lights/display\n\n2. Network connectivity:\n   - Ping printer IP address\n   - Verify printer shows in network devices\n   - Check network cable or WiFi connection\n\n3. Driver issues:\n   - Restart print spooler service\n   - Remove and re-add printer\n   - Update/reinstall printer drivers\n\n4. Common fixes:\n   - Clear print queue\n   - Restart printer\n   - Check toner/ink levels\n\n**Escalation:** If issue persists, escalate to L2 with diagnostic logs and error codes.\n\nShould I create a support ticket for this printer issue?',
        software: 'Software Installation Request Process:\n\n**Step 1: Verification**\n- Check if software is on approved list\n- Verify user has business justification\n- Confirm license availability\n\n**Step 2: Approval**\n- Manager approval required\n- Security team review for new software\n- Budget approval if purchase needed\n\n**Step 3: Installation**\n- Deploy via SCCM/Intune if available\n- Manual installation if required\n- Verify functionality\n- Document in asset management\n\n**Step 4: Documentation**\n- Update ServiceNow ticket\n- Record license assignment\n- Provide user training if needed\n\n**SLA:** Standard installations - 2 business days\nUrgent requests require L2 approval.\n\nWould you like me to initiate a software request ticket?',
        escalate: 'Ticket Escalation to Level 2 - Best Practices:\n\n**When to Escalate:**\n- Issue exceeds L1 knowledge base\n- Requires elevated system access\n- Hardware replacement needed\n- Complex network/server issues\n- Security incidents\n- SLA breach imminent\n\n**Escalation Checklist:**\n1. Document all troubleshooting steps taken\n2. Gather diagnostic information:\n   - Error messages/screenshots\n   - System logs\n   - Network traces if applicable\n3. Update ticket with complete timeline\n4. Set priority appropriately\n5. Notify user of escalation\n6. Add detailed notes for L2 team\n\n**In ServiceNow:**\n- Change Assignment Group to "L2 Support"\n- Update ticket priority if needed\n- Add tag "Escalated-from-L1"\n- Set watch on ticket for updates\n\nRemember: Good documentation speeds up L2 resolution!\n\nNeed help escalating a specific ticket?',
      };

      let responseContent = 'I understand you need assistance. Let me help you with that.\n\n';

      const lowerInput = inputMessage.toLowerCase();
      if (lowerInput.includes('password') || lowerInput.includes('reset')) {
        responseContent = aiResponses.password;
      } else if (lowerInput.includes('vpn')) {
        responseContent = aiResponses.vpn;
      } else if (lowerInput.includes('workstation') || lowerInput.includes('setup') || lowerInput.includes('employee')) {
        responseContent = aiResponses.workstation;
      } else if (lowerInput.includes('printer')) {
        responseContent = aiResponses.printer;
      } else if (lowerInput.includes('software') || lowerInput.includes('install')) {
        responseContent = aiResponses.software;
      } else if (lowerInput.includes('escalate') || lowerInput.includes('l2')) {
        responseContent = aiResponses.escalate;
      } else {
        responseContent = 'I can help you with:\n\n- Password resets and account lockouts\n- VPN connectivity issues\n- Software installation requests\n- Hardware troubleshooting (desktops, laptops, printers)\n- New user onboarding/offboarding\n- Email and Office 365 issues\n- Basic network troubleshooting\n- Ticket escalation procedures\n\nPlease provide more details about your specific issue, and I\'ll guide you through the resolution process.';
      }

      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">AI Support Assistant</h2>
        <p className="text-gray-600 mt-1">Get instant help with Level 1 & Level 2 IT support tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">IT Support AI</h3>
                  <p className="text-xs text-blue-100">Always available to help</p>
                </div>
                <Sparkles className="ml-auto text-yellow-300" size={20} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-gray-700' : 'bg-blue-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="text-white" size={18} />
                    ) : (
                      <Bot className="text-white" size={18} />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${
                      message.role === 'user' ? 'text-right' : ''
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={18} />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Suggested Questions</h3>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-sm text-gray-700 hover:text-blue-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">AI Capabilities</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Level 1 & 2 Support Guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Troubleshooting Workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Ticket Creation & Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Knowledge Base Access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Onboarding/Offboarding Procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>SLA Monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISupport;
