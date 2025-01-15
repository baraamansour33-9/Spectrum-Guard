import './Style.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

export function Home(){
    
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause when component mounts
  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };
    const handleLogout = () => {
       

        // Navigeer naar de inlogpagina ('/')
        navigate('/');
    };

    return(
        <>
     
    <div class="menu">
        <ul>
            <li class="profile">
                <div class="img-row">
                <img src="/icon.png" alt="profile" />

                </div>
                <h2>Spectrum Guard</h2>
            </li>
            <li>
                <a href="#">
                <img src="/business-report.png" alt="" />
                    <p>Dashbord</p>

                </a>
            </li>
            <li>
                <a href="#">
                <img src="/data-table.png" alt="product" />
                    <p>Product</p>

                </a>
            </li>
            <li>
                <a href="#">
                <img src="/file-lock.png" alt="security" />
                    <p>Security</p>

                </a>
            </li>
            <li>
                <a href="#">
                <img src="/pie-chart.png" alt="" />
                    <p>Charts</p>

                </a>
            </li>
            <li>
                <a href="#">
                <img src="/cogwheel.png" alt="" />
                    <p>Settings</p>
                 
                 </a>
            </li>
            <li>
           <a href="#" onClick={handleLogout}>
           <img src="/switch.png" alt="log out" />
           <p>Log Out</p>
            </a>
             </li>
            
        </ul>
        </div>
     
     <div class="content">
        <div class="title-info">
            <p>Dashbord</p>
            <i class="fa-solid fa-bars"></i>
        </div>
         <div class="data-info">
            <div class="row">
                <i class="fas fa-signal-bars "></i>
                <i class="fa-solid fa-signal" style={{color: 'rgb(34, 187, 20)'}}  ></i> 
                <div class="data">
                   <p>Sensors</p>
                 </div>
            </div>
            <div class="row">
                <i class="fa-solid fa-clock-rotate-left"  style={{color: 'rgb(219, 98, 17)'}} ></i>
                <div class="data">
                    <p class = "cart-title">Yesterday visits</p>
                    <p></p>
             </div>
            </div>
            <div class="row">
                <i class="fas fa-users"  style={{color: 'gray'}} ></i>
                <div class="data">
                    <p>Visitors today</p>
                </div>
            </div>
            <div class="row">
                <i class="fas fa-feather"  style={{color: 'lightgreen'}}></i>
                <div class="data">
                    <p>Total visits</p>
               </div>
            </div>
            </div>
        <div class="row mt-4">
        <div class="col-md-12"> 
            <div >
                <div class="title-info">
                    <p class="title" style={{color: 'rgb(240, 86, 86)'}} >Live</p>
                
                </div>
            </div>
            
            <div class="phone-container">
                <audio style={{"visibility":"hidden", "position":"absolute"}}
        controls
        src="./alert.mp3" // Replace with your audio file path
        autoPlay={isPlaying}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

 <style>

</style>

<div class="chart" id="chart">
  <div className={"animate-threshold-line threshold-line"} id="threshold-line"></div>
  <div class="threshold-line2"></div>
</div>

                    <canvas id="lineChart" width="500" height="300"></canvas>
                    <audio id="alert-sound" src="alert.mp3" controls ></audio>
           
    </div>
    </div>
    </div>

      <div class="title-info">
            <p>Product</p>
            <i class="fas fa-table"></i>
        </div>
     <table>
            <thead>
                <tr>
                    <th>Mobile name</th>
                    <th>Active</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Signal</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Samsung</td>
                    <td><span class="Active">Active</span></td>
                    <td><span class="Time">08:41 AM</span></td>
                    <td><span class="Date">2023-09-09</span></td>
                    <td><span class="Signal">weak</span></td>
                    <td><span class="Frequency">MHz</span></td>
                </tr>

                <tr>
                    <td>Samsung</td>
                    <td><span class="Active">Active</span></td>
                    <td><span class="Time">09:55 AM</span></td>
                    <td><span class="Date">2023-09-09</span></td>
                    <td><span class="Signal">Weak</span></td>
                    <td><span class="Frequency">MHz</span></td>
                </tr>


                <tr>
                    <td>Iphone(89)</td>
                    <td><span class="Active">Active</span></td>
                    <td><span class="Time">13:07 PM</span></td>
                    <td><span class="Date">2023-09-09</span></td>
                    <td><span class="Signal">Weak</span></td>
                    <td><span class="Frequency">MHz</span></td>
                </tr>
            </tbody>
        </table>
    </div>
        </>

        
    )
}
