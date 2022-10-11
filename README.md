## Home automation applied in the integration of security cameras with Alexa virtual assistant using computer vision

### General objective
This project has the general objective to design and implement an application that provides, through images from security cameras, it can read a QR Code, identifying the arrival or departure of the user in their residence, and then, communicate with the virtual assistant Alexa that must release access to the residence.
Security systems that include IP cameras, have the availability of using a communication protocol called RTSP, already explained in the study. It will be with it that the NVR device will forward the images captured by the camera lens to another application.
A computer vision algorithm will be implemented in order to be able to identify and read QR Codes in footage made available in real time by the commented security system.

The security system forwards all captured images to an API that will be developed,
and that's where the computer vision algorithm will be running in the background. As soon as the algorithm identifies a valid QR Code, the API itself will send a request for the execution of routines in Alexa.

This communication between the API and Alexa presents an intermediary, IFTTT,
a free online service that allows its users to create simple service conditions through “Applets”

The IFTTT service will provide webhook services that trigger the detection of a valid QR Code, which will routinely be sent through another Applet called "Alexa Actions by mkZense".
This applet will provide "virtual buttons" that can be programmed in the Alexa application itself, which leaves the user's creativity free to do whatever they want with automation.

PROJECT IN PROGRESS.
