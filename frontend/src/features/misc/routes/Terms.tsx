import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import Header from "../../../components/Layout/Header";

const Terms = () => {
    return (
        <>
            <Header />
            <CustomContainer>
                <Box sx={{ py: 4, maxWidth: "800px", mx: "auto" }}>
                    <Typography variant="h3" component="h1" sx={{ mb: 3, color: "#1A8917" }}>
                        Terms of Service
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
                        Last updated: August 06, 2025
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        These Terms of Service ("Terms") govern your use of First Thought ("Service") operated by First Thought ("us", "we", or "our"). Please read these Terms carefully before using our Service.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        1. Acceptance of Terms
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        2. User Accounts
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        3. Content and Conduct
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        You retain ownership of any content you submit, post, or display on or through the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with the Service.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        You agree not to post content that:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>Is illegal, harmful, threatening, abusive, or defamatory</Typography>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>Infringes on intellectual property rights</Typography>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>Contains spam, malware, or other malicious code</Typography>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>Violates any applicable laws or regulations</Typography>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>Is inappropriate, offensive, or harassing</Typography>
                    </Box>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        4. Intellectual Property
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of First Thought and its licensors. The Service is protected by copyright, trademark, and other laws.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        5. Privacy Policy
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        6. Termination
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        7. Limitation of Liability
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        In no event shall First Thought, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        8. Disclaimer
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        9. Governing Law
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        10. Changes to Terms
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, color: "#1A8917" }}>
                        11. Contact Information
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        If you have any questions about these Terms of Service, please contact us:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                            By email: firstthought.platform@gmail.com
                        </Typography>
                        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                            By visiting this page on our website: /terms
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 4, color: "#666", fontStyle: "italic" }}>
                        These Terms of Service are effective as of August 06, 2025.
                    </Typography>
                </Box>
            </CustomContainer>
        </>
    );
};

export default Terms; 