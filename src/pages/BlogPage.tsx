import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://tppsxyfsovlawijtnbeq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcHN4eWZzb3ZsYXdpanRuYmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDg2MDYsImV4cCI6MjA4MTA4NDYwNn0.mjlvKYM0o4qi87WX0LER0-2Ll5qsYfkyzpDp9XjW0xQ'
);

const BlogPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your message' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const feedbackData = { 
        email: email.trim() || 'anonymous@example.com', 
        message: message.trim(),
        created_at: new Date().toISOString()
      };
      
      console.log('Submitting feedback:', feedbackData);
      
      const { data, error } = await supabase
        .from('feedback')
        .insert([feedbackData]);

      if (error) {
        console.error('Supabase error details:', error);
        throw new Error(error.message || 'Failed to submit feedback');
      }
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your feedback! We appreciate your input.'
      });
      setEmail('');
      setMessage('');
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error?.message || 'Failed to submit feedback. Please try again later.';
      setSubmitStatus({ 
        type: 'error', 
        message: `Error: ${errorMessage}. Check console for details.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.7', color: '#333' }}>
            <div style={{ marginBottom: '25px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>
                    ← Back to Home
                </Link>
            </div>
            
            <div>
                <h1 style={{ fontSize: '2.2em', marginBottom: '25px', lineHeight: '1.3', color: '#111' }}>
                    Building the Future of Expert–AI Lab Collaboration
                </h1>
                <h2 style={{ fontSize: '1.4em', marginBottom: '30px', color: '#444', fontWeight: 'normal', fontStyle: 'italic' }}>
                    Great Things Take Time — And We're Improving Faster Every Day
                </h2>
                
                <section style={{ marginBottom: '35px' }}>
                    <p>Every meaningful product begins with challenges. Bugs appear, systems break, and unexpected problems show up at the worst possible time. That's normal — especially when building something this ambitious.</p>
                    
                    <p style={{ margin: '20px 0' }}>Right now, most of the platform is being built by one person. That means sometimes fixes take a little longer. But the commitment is simple:</p>
                    
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: '25px 0' }}>
                        <li style={{ marginBottom: '10px', paddingLeft: '25px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0', color: '#2563eb' }}>•</span>
                            Every problem will be solved.
                        </li>
                        <li style={{ marginBottom: '10px', paddingLeft: '25px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0', color: '#2563eb' }}>•</span>
                            Every issue will be fixed.
                        </li>
                        <li style={{ paddingLeft: '25px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0', color: '#2563eb' }}>•</span>
                            And we'll move faster and smarter with each update.
                        </li>
                    </ul>
                    
                    <p>This platform is growing rapidly. And with every challenge we overcome, the foundation becomes stronger for everyone who joins.</p>
                </section>

                <section style={{ marginBottom: '35px', backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.7em', margin: '0 0 20px 0', color: '#111' }}>What We're Creating</h2>
                    <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                        We're building an AI-powered platform that connects expert talent with the world's leading AI labs.
                        <br/><br/>
                        It's not a job board. It's not a freelance marketplace.
                        <br/>
                        It's a new kind of ecosystem.
                    </p>
                </section>

                <section style={{ marginBottom: '35px' }}>
                    <h2 style={{ fontSize: '1.7em', margin: '25px 0 20px 0', color: '#111', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                        The Core Vision
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '25px 0' }}>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px' }}>
                            <h3 style={{ color: '#2563eb', marginBottom: '10px' }}>For Experts</h3>
                            <p>Help demonstrate real skills through meaningful tasks and get matched with top AI labs that value your expertise.</p>
                        </div>
                        
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px' }}>
                            <h3 style={{ color: '#2563eb', marginBottom: '10px' }}>For AI Labs</h3>
                            <p>Access a trusted environment to discover and collaborate with high-quality researchers and engineers.</p>
                        </div>
                    </div>
                    
                    <p style={{ fontSize: '1.1em', lineHeight: '1.6', margin: '25px 0' }}>
                        We're creating a transparent system where performance speaks louder than titles, and where the best talent can connect with the most innovative AI labs in the world.
                    </p>
                </section>

                <section style={{ marginBottom: '35px' }}>
                    <h2 style={{ fontSize: '1.7em', margin: '25px 0 20px 0', color: '#111', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                        Our Values
                    </h2>
                    
                    <div style={{ margin: '25px 0' }}>
                        <h3 style={{ fontSize: '1.2em', color: '#2563eb', marginBottom: '10px' }}>1. Speed With Responsibility</h3>
                        <p>We move fast, but never at the cost of safety or quality. Every update aims to improve stability and user experience.</p>
                        
                        <h3 style={{ fontSize: '1.2em', color: '#2563eb', margin: '25px 0 10px 0' }}>2. Transparency</h3>
                        <p>No hidden rules. No confusing systems. Experts and AI labs both see clear performance signals.</p>
                        
                        <h3 style={{ fontSize: '1.2em', color: '#2563eb', margin: '25px 0 10px 0' }}>3. Merit Over Buzzwords</h3>
                        <p>Your real abilities matter — not your résumé, not your followers, not your "profile."</p>
                        
                        <h3 style={{ fontSize: '1.2em', color: '#2563eb', margin: '25px 0 10px 0' }}>4. Constant Improvement</h3>
                        <p>Problems aren't setbacks. They are signals telling us what to improve next.</p>
                        
                        <h3 style={{ fontSize: '1.2em', color: '#2563eb', margin: '25px 0 10px 0' }}>5. Trust & Reliability</h3>
                        <p>Even with limited resources, the platform is built with serious care. The goal is long-term trust, not shortcuts.</p>
                    </div>
                </section>

                <section style={{ marginBottom: '35px', backgroundColor: '#f0f7ff', padding: '25px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.7em', margin: '0 0 20px 0', color: '#004494' }}>Why AI Labs Need This</h2>
                    <p style={{ marginBottom: '20px' }}>AI labs worldwide struggle with the same problems:</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '25px 0' }}>
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>Hard to Evaluate Real Skill</h4>
                            <p style={{ fontSize: '0.95em' }}>Most candidates look similar on paper. Our platform uses AI-driven tasks and analysis to reveal true ability.</p>
                        </div>
                        
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>Expensive and Slow Hiring</h4>
                            <p style={{ fontSize: '0.95em' }}>Interviews and filtering take huge time. Our system handles that automatically, reducing friction for both sides.</p>
                        </div>
                        
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>Global Talent Access</h4>
                            <p style={{ fontSize: '0.95em' }}>Great experts exist everywhere. We make them visible to top AI labs worldwide.</p>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '40px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                    <h2 style={{ fontSize: '1.5em', margin: '0 0 15px 0', color: '#111' }}>Taking Challenges Seriously</h2>
                    <p>Because this is a massive build with a small team, problems will appear. But the approach is simple:</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', margin: '20px 0', justifyContent: 'center' }}>
                        <div style={{ backgroundColor: '#e6f0ff', color: '#0047b3', padding: '10px 20px', borderRadius: '20px', fontWeight: '500' }}>Identify</div>
                        <div style={{ color: '#666', alignSelf: 'center' }}>→</div>
                        <div style={{ backgroundColor: '#e6f0ff', color: '#0047b3', padding: '10px 20px', borderRadius: '20px', fontWeight: '500' }}>Fix</div>
                        <div style={{ color: '#666', alignSelf: 'center' }}>→</div>
                        <div style={{ backgroundColor: '#e6f0ff', color: '#0047b3', padding: '10px 20px', borderRadius: '20px', fontWeight: '500' }}>Improve</div>
                        <div style={{ color: '#666', alignSelf: 'center' }}>→</div>
                        <div style={{ backgroundColor: '#e6f0ff', color: '#0047b3', padding: '10px 20px', borderRadius: '20px', fontWeight: '500' }}>Accelerate</div>
                    </div>
                    
                    <p>Every bug solved becomes a future strength. Every delay becomes faster execution tomorrow.</p>
                    
                    <p style={{ marginTop: '15px', fontStyle: 'italic' }}>
                        You're not joining a finished platform — you're joining a platform evolving at high speed, with real purpose.
                    </p>
                </section>

                <section style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.8em', margin: '0 0 20px 0', color: '#111' }}>Moving Forward Together</h2>
                    <p style={{ fontSize: '1.1em', maxWidth: '700px', margin: '0 auto 25px', lineHeight: '1.7' }}>
                        Thank you for believing in something this early. Your presence, feedback, and patience help shape a platform designed to redefine how the world's best talent connects with the leaders of AI innovation.
                    </p>
                    
                    <p style={{ fontSize: '1.2em', fontWeight: '500', color: '#2563eb', margin: '30px 0' }}>
                        The mission is huge — and we're building it step by step, as fast as possible.
                    </p>
                    
                    <p style={{ fontSize: '1.3em', fontStyle: 'italic', marginTop: '40px', color: '#444' }}>
                        This is just the beginning.<br/>
                        The future of expert–AI lab collaboration starts here.
                    </p>
                </section>

                <section style={{ margin: '60px 0 40px', backgroundColor: '#f8fafc', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '1.5em', marginBottom: '20px', color: '#1e293b', textAlign: 'center' }}>We Value Your Feedback</h2>
                    <p style={{ textAlign: 'center', marginBottom: '25px', color: '#475569' }}>
                        Found an issue? Have a suggestion? We'd love to hear from you.
                    </p>
                    
                    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }} noValidate>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Email (optional)</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '1em',
                                    color: '#1e293b',
                                    backgroundColor: '#fff',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Your Message *</label>
                            <textarea 
                                id="message" 
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Please describe your concern or suggestion in detail..."
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '1em',
                                    color: '#1e293b',
                                    fontFamily: 'Arial, sans-serif',
                                    resize: 'vertical',
                                    minHeight: '120px',
                                    boxSizing: 'border-box'
                                }}
                            ></textarea>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <button 
                                type="submit"
                                style={{
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 28px',
                                    borderRadius: '6px',
                                    fontSize: '1em',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    minWidth: '180px'
                                }}
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: isSubmitting ? '#93c5fd' : '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 28px',
                                    borderRadius: '6px',
                                    fontSize: '1em',
                                    fontWeight: '500',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s',
                                    minWidth: '180px'
                                }}
                            >
                                Send Feedback
                            </button>
                        </div>
                        
                        {submitStatus && (
                            <div style={{
                                marginTop: '20px',
                                padding: '12px',
                                borderRadius: '6px',
                                backgroundColor: submitStatus.type === 'success' ? '#dcfce7' : '#fee2e2',
                                color: submitStatus.type === 'success' ? '#166534' : '#991b1b',
                                textAlign: 'center',
                                fontSize: '0.9em'
                            }}>
                                {submitStatus.message}
                            </div>
                        )}
                        <p style={{ fontSize: '0.85em', color: '#64748b', textAlign: 'center', marginTop: '15px' }}>
                            We read every message and will get back to you if needed.
                        </p>
                    </form>
                </section>

                <footer style={{ marginTop: '40px', paddingTop: '25px', borderTop: '1px solid #eee', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
                    <p>© {new Date().getFullYear()} AI Talent Platform. Building the future of expert-AI lab collaboration.</p>
                </footer>
            </div>
        </div>
    );
};

export default BlogPage;
