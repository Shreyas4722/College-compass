import { useState, useMemo } from 'react'
import './Faculty.css'

const BASE = 'https://www.alliance.edu.in/uploads/faculty_image/'

const FACULTY = [
  { name:'Dr. Anirudh Sridhar', degree:'D.Phil. in English', university:'University of Oxford', role:'Dean of Thought Leadership', img:'dr-anirudh-sridhar-v1.webp', dept:'Liberal Arts' },
  { name:'Dr. Pravin Rameshwarji Bhansali', degree:'Post Doc. in Medicinal Chemistry', university:'Johns Hopkins University, USA', role:'Professor', img:'dr-pravin-r-bhansali.webp', dept:'Science' },
  { name:'Dr. Vivek V', degree:'Ph.D. in Computer Science and Engineering', university:'National University of Singapore (NUS)', role:'Professor and Deputy Director', img:'dr-vivek-v.webp', dept:'Engineering' },
  { name:'Dr. Sunanda Roy', degree:'Ph.D. in Mechanical Engineering', university:'Nanyang Technological University & MIT, USA', role:'Associate Professor', img:'dr-sunanda-roy.jpg', dept:'Engineering' },
  { name:'Dr. Radhika Chandankere', degree:'Ph.D. in Environmental Science and Engineering', university:'University of Science and Technology Beijing', role:'Associate Professor', img:'dr-radhika-chandankere.webp', dept:'Science' },
  { name:'Dr. Pratima Verma', degree:'Post Doc in Business Ethics', university:'Stockholm University', role:'Professor & Area Chair – HRM', img:'dr-pratima-verma.jpg', dept:'Management' },
  { name:'Dr. Shamim S. Mondal', degree:'Ph.D. in Macroeconomics and Labour Economics', university:'University of Rochester, USA', role:'Professor & Program Director, MA Economics', img:'dr-shamim-s-mondal-1.webp', dept:'Economics' },
  { name:'Dr. Mukta Mukherjee', degree:'Ph.D. in Economics', university:'Syracuse University, USA', role:'Assistant Professor', img:'Dr-Mukta-Mukherjee-03-Sep-2021.jpg', dept:'Economics' },
  { name:'Dr. Jimin George', degree:'Ph.D. in Physics', university:'State University of New York at Buffalo', role:'Assistant Professor', img:'dr-jimin-george-v1.webp', dept:'Science' },
  { name:'Dr. Anupam Tyagi', degree:'Ph.D. in Economics', university:'University of Utah, USA', role:'Professor', img:'dr-anupam-tyagi.webp', dept:'Economics' },
  { name:'Dr. Suvarna Ramachandran', degree:'Ph.D. in Physics', university:'University of Kentucky, USA', role:'Assistant Professor', img:'dr-suvarna-ramachandran-1.webp', dept:'Science' },
  { name:'Dr. Sumita Datta', degree:'Ph.D. in Mathematical Sciences', university:'University of Texas at Arlington, USA', role:'Associate Professor', img:'dr-sumita-datta.jpg', dept:'Mathematics' },
  { name:'Dr. Srikanth Itapu', degree:'Ph.D. in Engineering', university:'The University of Toledo, USA', role:'Associate Professor & International Relations Coordinator', img:'dr-itapu-srikanth.jpg', dept:'Engineering' },
  { name:'Dr. Julien Paret', degree:'Ph.D. in Post-Soviet Studies', university:'National Institute for Oriental Languages, Paris', role:'Assistant Professor & Director ACES & HOD Political Science', img:'dr-julien-paret.jpg', dept:'Liberal Arts' },
  { name:'Dr. Sarit Maitra', degree:'Ph.D. in Information Technology', university:'Universiti Teknologi Petronas, Malaysia', role:'Professor', img:'dr-sarit-maitra-25-03-2022.jpg', dept:'Engineering' },
  { name:'Dr. Mithun Hanumesh', degree:'Ph.D. in Green Roofs', university:'University of Lorraine, France', role:'Assistant Professor', img:'dr-mithun-hanumesh.jpg', dept:'Engineering' },
  { name:'Dr. Mohit Hemanth Kumar', degree:'Post Doc. in Materials and Production Engineering', university:'TGGS, King Mongkut\'s University, Thailand', role:'Assistant Professor & Associate Director CoE (IPR Cell)', img:'dr-mohit-hemanth-kumar-1.webp', dept:'Engineering' },
  { name:'Dr. Shamik Chakravarty', degree:'Ph.D. in Philosophy', university:'Lingnan University, Hong Kong', role:'Assistant Professor', img:'dr-shamik-chakravarty.jpg', dept:'Liberal Arts' },
  { name:'Dr. Ajam Shaikh', degree:'Ph.D. in Organic Chemistry', university:'National Dong Hwa University, Taiwan', role:'Assistant Professor', img:'dr-ajam-shaikh-v1.webp', dept:'Science' },
  { name:'Dr. GGS Pradeep', degree:'Post Doc in Computer Science (Machine Learning)', university:'University of South Florida, USA', role:'Professor', img:'dr-ggs-pradeep-1.webp', dept:'Engineering' },
  { name:'Dr. Ray Titus', degree:'DBA in Management', university:'Swiss Management Centre, Switzerland', role:'Pro Vice-Chancellor & Dean, ASOB', img:'dr-ray-titus-v1.webp', dept:'Management' },
  { name:'Dr. Jaya Ganesan', degree:'Ph.D. in Management', university:'Multimedia University, Malaysia', role:'Professor', img:'dr-jaya-ganesan.jpg', dept:'Management' },
  { name:'Dr. G. Ramana Murthy', degree:'Ph.D. in Engineering', university:'Multimedia University, Malaysia', role:'Professor & Program Director - Ph.D.', img:'dr-g-ramana-murthy.jpg', dept:'Engineering' },
  { name:'Dr. Mojgan Jahanara', degree:'Ph.D. in Design Theory and Visual Communication', university:'Kobe Design University, Japan', role:'Professor', img:'dr-mojgan-jahanara-v1.webp', dept:'Design' },
  { name:'Dr. Alick Rabson Gumbo', degree:'Ph.D. in Business Management', university:'Copperbelt University', role:'Professor', img:'dr-alick-rabson-gumbo.webp', dept:'Management' },
  { name:'Dr. Neetu Talreja', degree:'Post Doc in Chemistry', university:'Gachon University, South Korea', role:'Associate Professor', img:'dr-neetu-talreja-25-03-2022.jpg', dept:'Science' },
  { name:'Dr. James P Welch', degree:'Ph.D. in International Law', university:'Leiden University', role:'Professor', img:'dr-james-welch.webp', dept:'Law' },
  { name:'Dr. Chandra Shekhar K E', degree:'Ph.D. in Fashion Retail Management', university:'Prescott University', role:'Professor & Associate Director – Academic Operations', img:'dr-chandra-shekhar-k-e.jpg', dept:'Design' },
  { name:'Mr. Harsh Maheshwari', degree:"Master's in Business Administration", university:'Brandeis University', role:'Assistant Professor', img:'mr-harsh-maheshwari.webp', dept:'Management' },
  { name:'Dr. George Easaw', degree:'Ph.D. in Management', university:'IIT Bombay', role:'Professor', img:'dr-george-easaw-v1.webp', dept:'Management' },
  { name:'Dr. Priyanka Biswas', degree:'Post Doc. in Physical Sciences', university:'IIT Madras', role:'Assistant Professor', img:'dr-priyanka-biswas.jpg', dept:'Science' },
  { name:'Dr. Harinath Aireddy', degree:'Ph.D. in Physics', university:'IIT Kharagpur', role:'Associate Professor & Director CoE (Additive Manufacturing)', img:'dr-harinath-aireddy-1.webp', dept:'Science' },
  { name:'Dr. V. Thiruvengadam', degree:'Ph.D. in Magnetic Nanocomposites', university:'IIT Bombay', role:'Assistant Professor', img:'dr-v-thiruvengadam-v1.webp', dept:'Science' },
  { name:'Dr. Athul Joseph', degree:'Ph.D. in Aerospace Engineering', university:'IISc, Bangalore', role:'Assistant Professor', img:'dr-athul-joseph.jpg', dept:'Engineering' },
  { name:'Dr. Vivekanand', degree:'Ph.D. in Management', university:'IIT Bombay', role:'Professor & Program Director - Ph.D.', img:'dr-vivekanand-g.jpg', dept:'Management' },
  { name:'Dr. Sandip Debnath', degree:'Ph.D. in Literature', university:'IIT Delhi', role:'Assistant Professor', img:'dr-sandip-debnath.jpg', dept:'Liberal Arts' },
  { name:'Dr. Ravi Chakraborty', degree:'Ph.D. in Humanities & Social Sciences', university:'IIT Delhi', role:'Assistant Professor & Director - Communication for Liberal Arts', img:'dr-ravi-chakraborty-1.webp', dept:'Liberal Arts' },
  { name:'Dr. V. J. Byra Reddy', degree:'Ph.D. in Business Administration', university:'Mangalore University', role:'Professor & Dean – Academic Affairs', img:'dr-byra-reddy.webp', dept:'Management' },
  { name:'Dr. Chandni Pathak', degree:'Ph.D. in Chemistry', university:'IIT Bombay', role:'Assistant Professor', img:'dr-chandni-pathak-17-02-2022.jpg', dept:'Science' },
  { name:'Dr. Srashti Dwivedi', degree:'Ph.D. in Mathematics', university:'IIT Delhi', role:'Assistant Professor', img:'dr-srashti-dwivedi.jpg', dept:'Mathematics' },
  { name:'Dr. Syed Alay Hashim', degree:'Ph.D. in Aerospace Engineering', university:'IIT Kharagpur', role:'Associate Professor & Director CoE (Propulsion Systems)', img:'dr-syed-alay-hashim.jpg', dept:'Engineering' },
  { name:'Dr. Rima Namhata', degree:'Ph.D. in Fiction Studies', university:'IIT Kharagpur', role:'Assistant Professor', img:'dr-rima-namhata-25-03-2022.jpg', dept:'Liberal Arts' },
  { name:'Dr. Jineesh AG', degree:'Ph.D. in Polymer Science and Technology', university:'IIT Kharagpur', role:'Associate Professor', img:'dr-jineesh-ag-v1.webp', dept:'Science' },
  { name:'Dr. Gaurav Kumar', degree:'Ph.D. in Electronics and Communication Engineering', university:'IIT Roorkee', role:'Associate Professor & HOD (In-Charge)', img:'dr-gaurav-kumar.jpg', dept:'Engineering' },
  { name:'Dr. Atul', degree:'Ph.D. in Mechanical Engineering', university:'IIT (ISM) Dhanbad', role:'Associate Professor & Ph.D. Program Coordinator', img:'dr-atul.jpg', dept:'Engineering' },
  { name:'Dr. Aparna Choudhary', degree:'Ph.D. in Management', university:'IIT (ISM) Dhanbad', role:'Associate Professor', img:'aparna-choudhary.jpg', dept:'Management' },
  { name:'Dr. Satya Prakash', degree:'Ph.D. in Mechanical Engineering', university:'IIT (ISM), Dhanbad', role:'Assistant Professor', img:'dr-satya-prakash.jpg', dept:'Engineering' },
  { name:'Dr. Soni', degree:'Ph.D. in Physics', university:'IIT (ISM), Dhanbad', role:'Assistant Professor', img:'dr-soni.webp', dept:'Science' },
  { name:'Dr. Manish Chaudhary', degree:'Ph.D. in Mathematics', university:'IIT (ISM) Dhanbad', role:'Assistant Professor', img:'dr-manish-chaudhary-v1.webp', dept:'Mathematics' },
  { name:'Dr. Vivek Mishra', degree:'Ph.D. in Applied Mathematics', university:'IIT (BHU) Varanasi', role:'Associate Professor - Pure and Applied Mathematics', img:'dr-vivek-mishra-v1.webp', dept:'Mathematics' },
  { name:'Dr. Vivekanand Mishra', degree:'Ph.D. in Physics', university:'Banaras Hindu University', role:'Professor', img:'dr-vivekanand-mishra-v1.webp', dept:'Science' },
  { name:'Dr. Sanjay Kumar Pandey', degree:'Ph.D. in Law', university:'Banaras Hindu University', role:'Professor', img:'dr-sanjay-kumar-pandey-v1.webp', dept:'Law' },
  { name:'Dr. Tosendra Dwivedi', degree:'Ph.D. in Social Psychology', university:'Banaras Hindu University', role:'Professor', img:'dr-tosendra-dwivedi.webp', dept:'Liberal Arts' },
  { name:'Dr. Mousumi Karmakar', degree:'Ph.D. in Computer Science and Engineering', university:'Banaras Hindu University', role:'Assistant Professor', img:'dr-mousumi-karmakar.jpg', dept:'Engineering' },
  { name:'Dr. Mamta Kumari', degree:'Ph.D. in Economics', university:'IIT Patna', role:'Assistant Professor', img:'dr-mamta-kumari.jpg', dept:'Economics' },
  { name:'Dr. Abhay Gupta', degree:'Ph.D. in Mechanical Engineering', university:'IIT Guwahati', role:'Assistant Professor', img:'dr-abhay-gupta-v1.webp', dept:'Engineering' },
  { name:'Dr. Munmi Saikia', degree:'Ph.D. in Economics', university:'IIT Guwahati', role:'Assistant Professor', img:'dr-munmi-saikia.jpg', dept:'Economics' },
  { name:'Dr. Manu Sharma', degree:'Ph.D. in Economics', university:'BITS Pilani', role:'Assistant Professor', img:'dr-manu-sharma-1.webp', dept:'Economics' },
  { name:'Dr. Sumant Kumar', degree:'Ph.D. in West Asian Studies', university:'Jawaharlal Nehru University', role:'Associate Professor', img:'dr-sumant-kumar.jpg', dept:'Liberal Arts' },
  { name:'Dr. Devanjan Khuntia', degree:'Ph.D. in Sociology', university:'Jawaharlal Nehru University', role:'Assistant Professor', img:'dr-devanjan-khuntia.webp', dept:'Liberal Arts' },
  { name:'Dr. Showkat Ahmad Wani', degree:'Ph.D. in Constitutional Law', university:'Aligarh Muslim University', role:'Associate Professor', img:'dr-showkat-ahmad-wani.webp', dept:'Law' },
  { name:'Dr. Ramanna Shetty', degree:'Ph.D. in Management', university:'NIT Karnataka, Surathkal', role:'Professor & Interim Director', img:'dr-ramanna-shetty.jpg', dept:'Management' },
  { name:'Dr. Chitrakara Hegde', degree:'Ph.D. in Chemistry', university:'NIT Karnataka, Surathkal', role:'Professor', img:'dr-chitrakara-hegde.jpg', dept:'Science' },
  { name:'Dr. Saswati Debnath', degree:'Ph.D. in Computer Science and Engineering', university:'NIT Silchar', role:'Associate Professor', img:'dr-saswati-debnath.jpg', dept:'Engineering' },
  { name:'Dr. Saikiran N', degree:'Ph.D. in Marketing Analytics', university:'NIT Tiruchirappalli', role:'Assistant Professor', img:'dr-saikiran-n-1.webp', dept:'Management' },
  { name:'Dr. Ramakrishna Salagrama', degree:'Ph.D. in Management', university:'IIM Raipur', role:'Assistant Professor & Program Director - UG', img:'dr-ramakrishna-salagrama-v1.webp', dept:'Management' },
  { name:'Dr. Liju Jacob Kuriakose', degree:'Ph.D. in English', university:'NIT Puducherry', role:'Associate Professor & Assistant Dean & HOD', img:'dr-liju-jacob-kuriakose.jpg', dept:'Liberal Arts' },
  { name:'Dr. Rashmi', degree:'Ph.D. in Physics', university:'NIT Kurukshetra', role:'Assistant Professor', img:'dr-rashmi-17-02-2022.jpg', dept:'Science' },
  { name:'Dr. Mukul Saxena', degree:'Ph.D. in Law', university:'Tata Institute of Social Sciences, Mumbai', role:'Professor & Director - Centre for PG and Legal Studies', img:'mukul-saxena.webp', dept:'Law' },
  { name:'Dr. Vineetha Sivakumar', degree:'Ph.D. in Social Sciences', university:'Tata Institute of Social Sciences', role:'Associate Professor & Assistant Director – Ph.D', img:'dr-vineetha-sivakumar.jpg', dept:'Liberal Arts' },
  { name:'Dr. Divya Kalathingal', degree:'Ph.D in Social Work', university:'Tata Institute of Social Sciences', role:'Assistant Professor', img:'dr-divya-k.webp', dept:'Liberal Arts' },
  { name:'Dr. Maitreyee Das', degree:'Ph.D. in Management', university:'Indian Institute of Foreign Trade', role:'Associate Professor', img:'dr-maitreyee-das.jpg', dept:'Management' },
  { name:'Dr. Jyotishkumar Parameswaranpillai', degree:'Post Doc. in Chemistry', university:'Leibniz Institute of Polymer Research, Germany', role:'Professor & Director CoE (AU–STIC)', img:'dr-jyotishkumar-parameswaranpillai-v1.webp', dept:'Science' },
  { name:'Dr. Astha Badjatia', degree:'Ph.D. in Management', university:'Devi Ahilya Vishwavidyalaya, Indore', role:'Assistant Professor & MBA Program Coordinator', img:'dr-astha-badjatia.jpg', dept:'Management' },
  { name:'Dr. Vijay Bahadur', degree:'Ph.D. in Chemistry', university:'University of Delhi', role:'Associate Professor', img:'dr-vijay-bahadur-17-02-2022.jpg', dept:'Science' },
  { name:'Dr. Puja Raj', degree:'Ph.D. in Philosophy', university:'University of Delhi', role:'Assistant Professor', img:'prof-puja-raj-17-02-2022.jpg', dept:'Liberal Arts' },
  { name:'Dr. Soumodip Sinha', degree:'Ph.D. in Sociology', university:'University of Delhi', role:'Assistant Professor', img:'dr-soumodip-sinha-v1.webp', dept:'Liberal Arts' },
  { name:'Dr. Raja Munusamy', degree:'Ph.D. in Aerospace Engineering', university:'University of Petroleum and Energy Studies', role:'Associate Professor', img:'dr-raja-munusamy-v1.webp', dept:'Engineering' },
  { name:'Dr. Chitra Kiran N', degree:'Ph.D. in Electronics & Communication Engineering', university:'Bangalore University', role:'Professor', img:'dr-chitra-kiran-n.jpg', dept:'Engineering' },
  { name:'Dr. Safika Praveen Sheikh', degree:'Ph.D. in Financial Management', university:'Jamia Millia Islamia', role:'Assistant Professor', img:'dr-safika-praveen-sheikh-17-02-2022.jpg', dept:'Management' },
  { name:'Dr. Payel Dutta', degree:'Ph.D. in Economics', university:'Vinoba Bhave University', role:'Assistant Professor', img:'prof-payel-dutta.jpg', dept:'Economics' },
  { name:'Dr. Usha Arcot', degree:'Post Doc Fellow in Applied Mathematics', university:'Srinivas University', role:'Professor & Head of the Department of Pure and Applied Mathematics', img:'dr-usha-arcot.jpg', dept:'Mathematics' },
  { name:'Dr. Govardhana Reddy H. G.', degree:'Ph.D. in Mathematics', university:'Visvesvaraya Technological University', role:'Assistant Professor', img:'dr-govardhana-reddy-h-g-17-02-2022.jpg', dept:'Mathematics' },
  { name:'Dr. V. Shyam Kishore', degree:'Ph.D. in Corporate Governance', university:'University of Madras', role:'Professor & Associate Dean – Academic Affairs & Dean – Alliance School of Law', img:'dr-v-shyam-kishore.jpg', dept:'Law' },
  { name:'Dr. M Bina Celine Dorathy', degree:'Ph.D. in Commerce', university:'University of Madras', role:'Professor', img:'dr-mbina-celine-dorathy-v1.webp', dept:'Management' },
  { name:'Dr. Devaiah N. G.', degree:'Ph.D. in Public Administration', university:'University of Madras', role:'Professor & Program Director - UG', img:'dr-devaiah-n-g-17-02-2022.jpg', dept:'Management' },
  { name:'Dr. Avijit Bakshi', degree:'Ph.D. in Business Administration', university:'University of Kalyani', role:'Professor', img:'dr-avijit-bakshi-1.webp', dept:'Management' },
  { name:'Dr. Sridhar T.', degree:'Ph.D. in Electrical & Electronics Engineering', university:'Visvesvaraya Technological University', role:'Professor & Director CoE (Robotics)', img:'dr-sridhar-t.jpg', dept:'Engineering' },
  { name:'Dr. Girish B. M.', degree:'Ph.D. in Mechanical Engineering', university:'University of Mysore', role:'Professor', img:'dr-girish-b-m.jpg', dept:'Engineering' },
  { name:'Dr. Divya U', degree:'Ph.D. in Management', university:'University of Mysore', role:'Associate Professor', img:'dr-divya-u.jpg', dept:'Management' },
  { name:'Dr. Prakash Kanive', degree:'Ph.D. in Law', university:'Karnataka State Law University', role:'Professor & School Blended Learning Coordinator', img:'dr-prakash-kanive.jpg', dept:'Law' },
  { name:'Dr. Vedashree A.', degree:'Ph.D. in Intellectual Property Rights', university:'Bengaluru University Law College', role:'Professor', img:'dr-vedashree-a.jpg', dept:'Law' },
  { name:'Dr. Shaheen Ebrahimkutty. A.V', degree:'Ph.D. in English', university:'University of Kerala', role:'Associate Professor', img:'dr-shaheen-ebrahimkutty-v1.webp', dept:'Liberal Arts' },
  { name:'Dr. Subhradev Sen', degree:'Ph.D. in Statistics', university:'Pondicherry University', role:'Associate Professor', img:'dr-subhradev-sen.jpg', dept:'Mathematics' },
  { name:'Dr. Shivaraj S.M.', degree:'Ph.D. in Plant Biotechnology', university:'TERI School of Advanced Studies', role:'Assistant Professor', img:'dr-shivaraj-sm.jpg', dept:'Science' },
  { name:'Dr. Indu Sharma', degree:'Ph.D. in Consumer Behavior', university:'Alliance University', role:'Assistant Professor & Blended Learning Coordinator', img:'dr-indu-sharma.jpg', dept:'Management' },
  { name:'Dr. Mrinmoy Bhattacharjee', degree:'Ph.D. in Commerce', university:'Assam University', role:'Professor & Area Chair - Marketing', img:'dr-mrinmoy-bhattacharjee.jpg', dept:'Management' },
  { name:'Dr. Anupama Tiwari', degree:'Ph.D. in Hindi', university:'Dakshin Bharat Hindi Prachar Sabha', role:'Associate Professor', img:'dr-anupama-tiwari.jpg', dept:'Liberal Arts' },
  { name:'Dr. Uma Sreedhar', degree:'Ph.D. in Psychology', university:'Bangalore University', role:'Professor & Head - Management Development Program', img:'dr-uma-sreedhar-jan22.jpg', dept:'Management' },
  { name:'Dr. Sunil Kumar', degree:'Ph.D. in Economics', university:'Sambalpur University', role:'Professor & HOD - Economics', img:'dr-sunil-kumar.jpg', dept:'Economics' },
  { name:'Dr. Arindam Das', degree:'Ph.D. in English', university:'Vidyasagar University', role:'Professor and Program Director – Ph.D.', img:'dr-arindam-das.jpg', dept:'Liberal Arts' },
  { name:'Dr. Shilpa S. Chadichal', degree:'Ph.D. in Management', university:'Visvesvaraya Technological University', role:'Associate Professor & Program Director - UG', img:'dr-shilpa-s-chadichal.jpg', dept:'Management' },
  { name:'Dr. Sandeep Dhariwal', degree:'Ph.D. in Electronics Engineering', university:'Banasthali University', role:'Professor', img:'dr-sandeep-dhariwal.jpg', dept:'Engineering' },
  { name:'Dr. Reeba Korah', degree:'Ph.D. in Information & Communication Engineering', university:'Anna University', role:'Professor & Dean - ASAE', img:'dr-reeba-korah-25-03-2022.jpg', dept:'Engineering' },
  { name:'Dr. Sengottaiyan N', degree:'Ph.D. in Wireless Sensor Networks', university:'Anna University', role:'Professor & Director CoE (IOT)', img:'dr-sengottaiyan-n.jpg', dept:'Engineering' },
  { name:'Dr. M. Selvam', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Professor', img:'dr-m-selvam-v1.webp', dept:'Engineering' },
  { name:'Dr. R.C. Karpagalakshmi', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Professor', img:'dr-rc-karpagalakshmi-v1.webp', dept:'Engineering' },
  { name:'Dr. Akey Sungheetha', degree:'Ph.D. in Information and Communication Engineering', university:'Anna University', role:'Associate Professor', img:'dr-akey-sungheetha.jpg', dept:'Engineering' },
  { name:'Dr. Rajesh Sharma R', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Associate Professor', img:'dr-rajesh-sharma-r.jpg', dept:'Engineering' },
  { name:'Dr. Rajkumar N', degree:'Ph.D. in Information and Communication Engineering', university:'Anna University', role:'Associate Professor', img:'dr-rajkumar-n-v1.webp', dept:'Engineering' },
  { name:'Dr. C. Viji', degree:'Ph.D. in Information and Communication Engineering', university:'Anna University', role:'Associate Professor', img:'dr-c-viji.jpg', dept:'Engineering' },
  { name:'Dr. Gnanaprakasam Thangavel', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University, Chennai', role:'Professor & Associate Director - Career Planning and Development', img:'dr-gnanaprakasam-thangavel-v1.webp', dept:'Engineering' },
  { name:'Dr. K A Venkatesh', degree:'Ph.D. in Mathematics', university:'Alagappa University', role:'Professor & Registrar (Examination & Evaluation)', img:'dr-k-a-venkatesh-v1.webp', dept:'Mathematics' },
  { name:'Dr. M. Senbagavalli', degree:'Ph.D. in Information & Communication Engineering', university:'Anna University', role:'Associate Professor', img:'dr-senbagavalli-m.jpg', dept:'Engineering' },
  { name:'Dr. Kavitha R Gowda', degree:'Ph.D. in Management (Marketing)', university:'Dravidian University', role:'Associate Professor', img:'dr-kavitha-r-gowda.jpg', dept:'Management' },
  { name:'Dr. Ajeet Sharma', degree:'Ph.D. in Management', university:'Guru Gobind Singh Indraprastha University', role:'Professor', img:'dr-ajeet-sharma.jpg', dept:'Management' },
  { name:'Dr. Apoorva Mishra', degree:'Ph.D. in Law', university:'Guru Gobind Singh Indraprastha University', role:'Assistant Professor', img:'dr-apoorva-mishra.jpg', dept:'Law' },
  { name:'Dr. Kapil Arora', degree:'Ph.D. in Management', university:'South Gujarat University', role:'Professor', img:'dr-kapil-arora.jpg', dept:'Management' },
  { name:'Dr. Satyendra Pratap Singh', degree:'Ph.D. in Management', university:'Jiwaji University', role:'Professor & Area Chair – Finance', img:'dr-satyendra-pratap-singh.jpg', dept:'Management' },
  { name:'Dr. Abdul Hameed A', degree:'Ph.D. in Management', university:'Bharathidasan University', role:'Professor', img:'dr-a-abdul-hameed.jpg', dept:'Management' },
  { name:'Dr. A Varadaraj', degree:'Ph.D. in Management', university:'Bharathidasan University', role:'Professor', img:'dr-a-varadaraj.jpg', dept:'Management' },
  { name:'Dr. J. Lenin', degree:'Ph.D. in Computer Science and Engineering', university:'Manonmaniam Sundaranar University', role:'Professor & HOD - In Charge', img:'dr-j-lenin.jpg', dept:'Engineering' },
  { name:'Dr. K. Ramalakshmi', degree:'Ph.D. in Information & Communication Engineering', university:'Anna University', role:'Professor & HOD - CSE & Director CoE (Computer Vision)', img:'dr-k-ramalakshmi.jpg', dept:'Engineering' },
  { name:'Dr. Rupesh Kumar M.', degree:'Ph.D. in Marketing', university:'Anna University, Chennai', role:'Associate Professor', img:'rupesh-kumar.jpg', dept:'Management' },
  { name:'Dr. Aparna Pavani', degree:'Ph.D. in Finance', university:'Andhra University', role:'Associate Professor', img:'dr-aparna-pavani-v1.webp', dept:'Management' },
  { name:'Dr. Chitra Krishnan', degree:'Ph.D. in South-Asian Diaspora Literature', university:'Andhra University', role:'Associate Professor & School Coordinator - Curriculum Development Centre', img:'dr-chitra-krishnan.webp', dept:'Liberal Arts' },
  { name:'Dr. Lopa Mandal', degree:'Ph.D. in Computer Science and Engineering', university:'Jadavpur University', role:'Professor', img:'dr-lopa-mandal.jpg', dept:'Engineering' },
  { name:'Dr. Smitha Rajagopal', degree:'Ph.D. in Computer Science and Engineering', university:'Manipal Academy of Higher Education', role:'Assistant Professor', img:'dr-smitha-rajagopal.jpg', dept:'Engineering' },
  { name:'Dr. Supriya Devi', degree:'Ph.D. in Applied Mathematics', university:'Amrita Vishwa Vidyalaya, Bangalore', role:'Associate Professor', img:'dr-supriya-devi.jpg', dept:'Mathematics' },
  { name:'Dr. Ila Rai', degree:'Ph.D. in Power Electronics', university:'Amrita Vishwa Vidyapeetham, Bangalore', role:'Assistant Professor', img:'dr-ila-rai.jpg', dept:'Engineering' },
  { name:'Dr. Rekha R Nair', degree:'Ph.D. in Computer Science and Engineering', university:'Amrita Vishwa Vidyapeetham, Bengaluru', role:'Associate Professor & Research Faculty', img:'dr-rekha-r-nair.jpg', dept:'Engineering' },
  { name:'Dr. Tina Babu', degree:'Ph.D. in Computer Science and Engineering', university:'Amrita Viswa Vidyapeetham, Bengaluru', role:'Associate Professor & Research Faculty', img:'dr-tina-babu.jpg', dept:'Engineering' },
  { name:'Dr. Sumit Kumar Banshal', degree:'Ph.D. in Computer Science and Engineering', university:'South Asian University (SAARC)', role:'Associate Professor & Central Blended Learning Coordinator', img:'dr-sumit-kumar-banshal-1.webp', dept:'Engineering' },
  { name:'Dr. Sanjeev S. Padashetty', degree:'Ph.D. in Management', university:'Vinayaka Missions University', role:'Professor', img:'dr-sanjeev-s-padashetty.webp', dept:'Management' },
  { name:'Dr. Jeevanandam J', degree:'Ph.D. in Computer Science and Engineering', university:'VelTech University', role:'Professor & Executive Director - Center for Distance and Online Education', img:'dr-Jeevanandam-j.jpg', dept:'Engineering' },
  { name:'Dr. Shekhar R.', degree:'Ph.D. in Computer Science and Engineering', university:'Manonmaniam Sundaranar University', role:'Professor and HOD (IT & M.Tech Programs)', img:'dr-shekhar-r.jpg', dept:'Engineering' },
  { name:'Dr. Chetan J. Shelke', degree:'Ph.D. in Computer Science and Engineering', university:'Sant Gadge Baba Amravati University', role:'Professor', img:'dr-chetan-j-shelke-v1.webp', dept:'Engineering' },
  { name:'Dr. Sajan Mathew', degree:'Ph.D. in Management', university:'Vinayaka Missions University', role:'Professor', img:'dr-sajan-mathew.jpg', dept:'Management' },
  { name:'Dr. Goutam K. Kundu', degree:'Ph.D. in Management', university:'VIT University, Vellore', role:'Professor', img:'dr-goutam-k-kundu-v1.webp', dept:'Management' },
  { name:'Dr. R. Niranchana', degree:'Ph.D. in Computer Science and Engineering', university:'Vellore Institute of Technology', role:'Assistant Professor', img:'dr-r-niranchana.jpg', dept:'Engineering' },
  { name:'Dr. Ananth S.', degree:'Ph.D. in Management', university:'Alagappa University', role:'Associate Professor', img:'dr-ananth-s-v1.webp', dept:'Management' },
  { name:'Dr. Sasmita Bal', degree:'Ph.D. in Mechanical Engineering', university:'Kalinga Institute of Industrial Technology', role:'Associate Professor', img:'dr-sasmita-bal.jpg', dept:'Engineering' },
  { name:'Dr. Anusuya Biswas', degree:'Ph.D. in Economics', university:'Amity University', role:'Associate Professor', img:'dr-anusuya-biswas.jpg', dept:'Economics' },
  { name:'Dr. Atanu Bhattacharyya', degree:'Ph.D. in Operations Management', university:'Lovely Professional University', role:'Associate Professor', img:'dr-atanu-bhattacharyya-v1.webp', dept:'Management' },
  { name:'Dr. Sheila Mahapatra', degree:'Ph.D. in Electrical & Electronics Communication', university:'The Northcap University', role:'Professor & Associate Director - Research (Academics)', img:'dr-sheila-mahapatra.jpg', dept:'Engineering' },
  { name:'Dr. Aby K. Thomas', degree:'Ph.D. in Electronics Engineering', university:'Sathyabama University', role:'Professor', img:'dr-aby-k-thomas-v1.webp', dept:'Engineering' },
  { name:'Dr. A. Ezil Sam Leni', degree:'Ph.D. in Computer Science and Engineering', university:'Sathyabama University, Chennai', role:'Professor', img:'dr-a-ezil-sam-leni.jpg', dept:'Engineering' },
  { name:'Dr. Athira B Kaimal', degree:'Ph.D. in Computer Science and Engineering', university:'Shri Venkateshwara University', role:'Associate Professor & Associate Director – RAISE', img:'dr-athira-b-kaimal.jpg', dept:'Engineering' },
  { name:'Dr. Rathnakar Achary', degree:'Ph.D. in Computer Science and Engineering', university:'Sastra University', role:'Associate Professor', img:'dr-rathnakar-achary-v1.webp', dept:'Engineering' },
  { name:'Dr. Smita Satapathy', degree:'Ph.D. in Criminal Law', university:'Siksha O Anusandhan, Bhubaneswar', role:'Associate Professor', img:'dr-smita-satapathy.jpg', dept:'Law' },
  { name:'Dr. Sukanya Kundu', degree:'Ph.D. in Management', university:'Netaji Subhas Open University', role:'Professor & Area Chair', img:'dr-sukanya-kundu.jpg', dept:'Management' },
  { name:'Dr. Virendra Kumar Shrivastava', degree:'Ph.D. in Data Mining', university:'Singhania University', role:'Professor', img:'dr-virendra-kumar-shrivastava.jpg', dept:'Engineering' },
  { name:'Dr. Vivekanand Jagannath Sajjan', degree:'Ph.D. in Kannada', university:'Central University of Karnataka', role:'Assistant Professor', img:'dr-vivekanand-jagannath-sajjan.jpg', dept:'Liberal Arts' },
  { name:'Dr. Digamber Singh', degree:'Ph.D. in Mechanical Engineering', university:'MNIT Allahabad', role:'Assistant Professor', img:'dr-digamber-singh-v1.webp', dept:'Engineering' },
  { name:'Dr. K. Sathesh Kumar', degree:'Ph.D. in Computer Science and Engineering', university:'Karpagam Academy of Higher Education', role:'Associate Professor', img:'dr-k-sathesh-kumar-v1.webp', dept:'Engineering' },
  { name:'Dr. Seema Sambargi', degree:'Ph.D. in Management', university:'Bharathiar University', role:'Professor', img:'dr-seema-sambargi.webp', dept:'Management' },
  { name:'Dr. Sakeena Hassan', degree:'Ph.D. in Law', university:'University of Kashmir', role:'Assistant Professor', img:'dr-sakeena-hassan.webp', dept:'Law' },
  { name:'Dr. K Sasi Kala Rani', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Professor & HOD - CSE (Work integrated programs)', img:'dr-k-sasi-kala-rani.webp', dept:'Engineering' },
  { name:'Dr. Swetha N', degree:'Ph.D. in Management', university:'University of Mysore', role:'Associate Professor', img:'dr-swetha-n.webp', dept:'Management' },
  { name:'Dr. Abhishek Thommandru', degree:'Ph.D. in Law', university:'Vellore Institute of Technology', role:'Assistant Professor', img:'dr-abhishek-thommandru-v1-.webp', dept:'Law' },
  { name:'Dr. Nandish Manangi', degree:'Ph.D. in Management', university:'Alliance University', role:'Professor & Program Head - MBA DT', img:'dr-nandish-manangi.webp', dept:'Management' },
  { name:'Dr. Rajeshkumar Lakshminarasimhan', degree:'Ph.D. in Metal Matrix Composite', university:'Anna University', role:'Professor', img:'dr-rajeshkumar-lakshminarasimhan.webp', dept:'Engineering' },
  { name:'Dr. Sujith P Surendran', degree:'Ph.D. in Renewable Energy Law', university:'University of Petroleum & Energy Studies', role:'Professor', img:'dr-sujith-p-surendran-v1.webp', dept:'Law' },
  { name:'Dr. Kaustubh Ray', degree:'Ph.D. in Cultural Studies', university:'Jadavpur University', role:'Professor & HOD - Communication Design', img:'dr-kaustubh-ray.webp', dept:'Design' },
  { name:'Dr. Bivitha Easo', degree:'Ph.D. in Comparative Literature', university:'University of Hyderabad', role:'Assistant Professor', img:'dr-bivitha-easo.webp', dept:'Liberal Arts' },
  { name:'Dr. Sandeep Shede', degree:'Ph.D. in African Studies', university:'University of Mumbai', role:'Assistant Professor', img:'dr-sandeep-shede.webp', dept:'Liberal Arts' },
  { name:'Dr. Sanjay Yadav', degree:'Ph.D. in Non-Linear partial differential equations', university:'IIT Roorkee', role:'Associate Professor', img:'dr-sanjay-yadav.webp', dept:'Mathematics' },
  { name:'Dr. Neeba E A', degree:'Ph.D. in Computer Science and Engineering', university:'Vel Tech University', role:'Associate Professor & Associate Director - Curriculum Development Center', img:'dr-neeba-e-a.webp', dept:'Engineering' },
  { name:'Dr. Indran Suyambulingam', degree:'Ph.D. in Mechanical Engineering', university:'Anna University', role:'Professor', img:'dr-indran-suyambulingam.webp', dept:'Engineering' },
  { name:'Dr. C Venkatesh', degree:'Ph.D. in Mechanical Engineering', university:'Anna University', role:'Professor', img:'dr-c-venkatesh-v1.webp', dept:'Engineering' },
  { name:'Dr. Jayabhaduri R', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Professor', img:'dr-r-jayabhaduri.webp', dept:'Engineering' },
  { name:'Dr. Rajasekar Rangasamy', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Professor', img:'dr-rajasekar-rangasamy.webp', dept:'Engineering' },
  { name:'Dr. Revathi T', degree:'Ph.D. in Computer Science and Engineering', university:'Anna University', role:'Assistant Professor', img:'dr-revathi-t.webp', dept:'Engineering' },
  { name:'Dr. Swastika Banerjee', degree:'Ph.D. in Botany', university:'University of Burdwan', role:'Assistant Professor', img:'dr-swastika-banerjee.webp', dept:'Science' },
]

const DEPTS = ['All','Engineering','Management','Science','Law','Liberal Arts','Mathematics','Economics','Design']

export default function Faculty() {
  const [q, setQ]           = useState('')
  const [dept, setDept]     = useState('All')
  const [imgErr, setImgErr] = useState({})

  const shown = useMemo(() => {
    let f = FACULTY
    if (dept !== 'All') f = f.filter(m => m.dept === dept)
    if (q.trim()) {
      const s = q.toLowerCase()
      f = f.filter(m =>
        m.name.toLowerCase().includes(s) ||
        m.role.toLowerCase().includes(s) ||
        m.dept.toLowerCase().includes(s) ||
        m.university.toLowerCase().includes(s)
      )
    }
    return f
  }, [q, dept])

  const initials = n => n.split(' ').filter(Boolean).slice(0,2).map(w => w[0]).join('').toUpperCase()

  return (
    <div className="faculty-page page">

      <div className="page-top">
        <div className="container">
          <h1>Faculty Directory</h1>
          <p>Core faculty of Alliance University · {FACULTY.length} members</p>
        </div>
      </div>

      <div className="fac-controls">
        <div className="container">
          <div className="fac-controls-inner">
            <div className="fac-search-wrap">
              <span className="fac-si">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                className="fac-input"
                type="text"
                placeholder="Search by name, role, department, or university…"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              {q && (
                <button className="fac-clear" onClick={() => setQ('')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="dept-tabs">
              {DEPTS.map(d => (
                <button key={d} className={`dept-tab${dept === d ? ' on' : ''}`} onClick={() => setDept(d)}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="count" style={{ marginTop: 20 }}>
          {shown.length} member{shown.length !== 1 ? 's' : ''}{dept !== 'All' ? ` · ${dept}` : ''}
        </div>
        <div className="fac-grid">
          {shown.map((m, i) => (
            <div className="fac-card" key={i}>
              <div className="fac-photo-wrap">
                {imgErr[i] ? (
                  <div className="fac-av-fallback">{initials(m.name)}</div>
                ) : (
                  <img
                    className="fac-photo"
                    src={`${BASE}${m.img}`}
                    alt={m.name}
                    loading="lazy"
                    onError={() => setImgErr(p => ({ ...p, [i]: true }))}
                  />
                )}
              </div>
              <div className="fac-info">
                <div className="fac-name">{m.name}</div>
                <div className="fac-role">{m.role}</div>
                <div className="fac-degree">{m.degree}</div>
                <div className="fac-uni">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11H15v-6H9v6H3V9z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {m.university}
                </div>
                <div className="fac-dept-tag">{m.dept}</div>
              </div>
            </div>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty"><h3>No results</h3><p>Try a different search or filter</p></div>
        )}
      </div>
    </div>
  )
}
